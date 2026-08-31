import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { useViewer, type ViewMode } from "@/lib/starship/store";
import {
  CRYO_CH4,
  CRYO_LOX,
  GLASS,
  NOZZLE,
  NOZZLE_VAC,
  PUMP,
  STEEL,
  STEEL_DARK,
  STEEL_SOOT,
  STRUCTURE,
  TILE,
  TITANIUM,
} from "@/lib/starship/constants";
import { makeNozzleMap, makeSootMap, makeSteelMaps, makeTileMaps } from "@/lib/starship/geometry";

export type MatBag = {
  steel: THREE.MeshStandardMaterial;
  steelDark: THREE.MeshStandardMaterial;
  soot: THREE.MeshStandardMaterial;
  tile: THREE.MeshStandardMaterial;
  nozzle: THREE.MeshStandardMaterial;
  nozzleVac: THREE.MeshStandardMaterial;
  pump: THREE.MeshStandardMaterial;
  glass: THREE.MeshStandardMaterial;
  lox: THREE.MeshStandardMaterial;
  ch4: THREE.MeshStandardMaterial;
  structure: THREE.MeshStandardMaterial;
  titanium: THREE.MeshStandardMaterial;
  black: THREE.MeshStandardMaterial;
  pad: THREE.MeshStandardMaterial;
};

const MatCtx = createContext<MatBag | null>(null);
export const ClipCtx = createContext<THREE.Plane[]>([]);

function make(color: string, metalness: number, roughness: number, map?: THREE.Texture) {
  const m = new THREE.MeshStandardMaterial({
    color,
    metalness,
    roughness,
    map: map ?? null,
    envMapIntensity: 1.05,
    emissive: "#090a0c",
    emissiveIntensity: 0.08,
  });
  m.userData.metalness = metalness;
  m.userData.roughness = roughness;
  return m;
}

function createBag(): MatBag {
  const steel = makeSteelMaps();
  const tiles = makeTileMaps();
  const soot = makeSootMap();
  const nozzle = makeNozzleMap();

  const steelMat = make(STEEL, 0.7, 0.4, steel.map);
  steelMat.roughnessMap = steel.roughnessMap;
  steelMat.bumpMap = steel.bumpMap;
  steelMat.bumpScale = 0.04;

  const steelDark = make(STEEL_DARK, 0.66, 0.46, steel.map);
  steelDark.bumpMap = steel.bumpMap;
  steelDark.bumpScale = 0.03;

  const sootMat = make(STEEL_SOOT, 0.38, 0.68, soot);
  sootMat.bumpMap = steel.bumpMap;
  sootMat.bumpScale = 0.02;

  const tileMat = make(TILE, 0.05, 0.88, tiles.map);
  tileMat.bumpMap = tiles.bumpMap;
  tileMat.bumpScale = 0.035;
  tileMat.envMapIntensity = 0.35;

  const nozzleMat = make(NOZZLE, 0.55, 0.42, nozzle);
  const nozzleVac = make(NOZZLE_VAC, 0.52, 0.44, nozzle);

  return {
    steel: steelMat,
    steelDark,
    soot: sootMat,
    tile: tileMat,
    nozzle: nozzleMat,
    nozzleVac,
    pump: make(PUMP, 0.72, 0.32),
    glass: make(GLASS, 0.15, 0.05),
    lox: make(CRYO_LOX, 0.15, 0.55),
    ch4: make(CRYO_CH4, 0.12, 0.58),
    structure: make(STRUCTURE, 0.75, 0.45),
    titanium: make(TITANIUM, 0.8, 0.38),
    black: make("#111214", 0.4, 0.55),
    pad: make("#6a6c6f", 0.05, 0.78),
  };
}

function applyMode(bag: MatBag, mode: ViewMode, planes: THREE.Plane[]) {
  const list = Object.values(bag);
  const cut = planes.length > 0;
  for (const m of list) {
    m.clippingPlanes = planes;
    m.clipShadows = cut;
    const baseM = m.userData.metalness as number;
    const baseR = m.userData.roughness as number;
    if (mode === "solid") {
      m.transparent = false;
      m.opacity = 1;
      m.depthWrite = true;
      m.wireframe = false;
      m.side = cut ? THREE.DoubleSide : THREE.FrontSide;
      m.metalness = baseM;
      m.roughness = baseR;
      m.emissive.set("#090a0c");
      m.emissiveIntensity = 0.08;
    } else if (mode === "wireframe") {
      m.transparent = false;
      m.opacity = 1;
      m.depthWrite = true;
      m.wireframe = true;
      m.side = THREE.DoubleSide;
      m.metalness = 0.1;
      m.roughness = 0.8;
      m.emissive.set("#000000");
      m.emissiveIntensity = 0;
    } else if (mode === "xray") {
      m.transparent = true;
      m.opacity = 0.16;
      m.depthWrite = false;
      m.wireframe = false;
      m.side = THREE.DoubleSide;
      m.metalness = 0.05;
      m.roughness = 0.35;
      m.emissive.set("#1c2228");
      m.emissiveIntensity = 0.4;
    } else {
      m.transparent = true;
      m.opacity = 0.38;
      m.depthWrite = false;
      m.wireframe = false;
      m.side = THREE.DoubleSide;
      m.metalness = baseM;
      m.roughness = baseR;
      m.emissive.set("#000000");
      m.emissiveIntensity = 0;
    }
    m.needsUpdate = true;
  }
  bag.glass.transparent = true;
  bag.glass.opacity = mode === "solid" ? 0.45 : mode === "xray" ? 0.2 : 0.3;
  bag.glass.depthWrite = false;
  bag.nozzle.side = THREE.DoubleSide;
  bag.nozzleVac.side = THREE.DoubleSide;
  bag.lox.side = THREE.DoubleSide;
  bag.ch4.side = THREE.DoubleSide;
}

export function MaterialsProvider({
  children,
  planes,
}: {
  children: ReactNode;
  planes: THREE.Plane[];
}) {
  const bag = useMemo(() => createBag(), []);
  const mode = useViewer((s) => s.viewMode);

  useLayoutEffect(() => {
    applyMode(bag, mode, planes);
  }, [bag, mode, planes]);

  useEffect(() => {
    return () => {
      for (const m of Object.values(bag)) {
        m.map?.dispose();
        m.roughnessMap?.dispose();
        m.bumpMap?.dispose();
        m.dispose();
      }
    };
  }, [bag]);

  return (
    <ClipCtx.Provider value={planes}>
      <MatCtx.Provider value={bag}>{children}</MatCtx.Provider>
    </ClipCtx.Provider>
  );
}

export function useMats() {
  const ctx = useContext(MatCtx);
  if (!ctx) throw new Error("useMats outside provider");
  return ctx;
}
