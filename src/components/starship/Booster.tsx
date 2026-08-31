import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BOOSTER, GRID_FIN, R, RAPTOR, RING } from "@/lib/starship/constants";
import { BOOSTER_ENGINES, createBellGeometry } from "@/lib/starship/geometry";
import { useViewer } from "@/lib/starship/store";
import { useMats } from "./materials";
import { Highlight, Part } from "./Part";

function GridFin({ az }: { az: number }) {
  const mats = useMats();
  const { height: h, width: w, depth: d } = GRID_FIN;
  const bars = useMemo(() => {
    const list: { pos: [number, number, number]; size: [number, number, number] }[] = [];
    const t = 0.055;
    // Frame — inner edge at local x=0 (outside hull), extends +X
    list.push({ pos: [w / 2, t / 2, 0], size: [w, t, t] });
    list.push({ pos: [w / 2, h - t / 2, 0], size: [w, t, t] });
    list.push({ pos: [t / 2, h / 2, 0], size: [t, h, t] });
    list.push({ pos: [w - t / 2, h / 2, 0], size: [t, h, t] });
    const cols = 6;
    const rows = 8;
    for (let i = 1; i < cols; i++) {
      list.push({ pos: [(i * w) / cols, h / 2, 0], size: [t * 0.65, h - t * 2, t * 0.65] });
    }
    for (let j = 1; j < rows; j++) {
      list.push({ pos: [w / 2, (j * h) / rows, 0], size: [w - t * 2, t * 0.65, t * 0.65] });
    }
    // Depth webs
    list.push({ pos: [w / 2, t / 2, d * 0.35], size: [w, t * 0.7, t] });
    list.push({ pos: [w / 2, h - t / 2, d * 0.35], size: [w, t * 0.7, t] });
    return list;
  }, [h, w, d]);

  return (
    <group rotation={[0, az, 0]}>
      <group position={[R + GRID_FIN.standoff, -h / 2, 0]}>
        <mesh position={[-0.18, h / 2, 0]} material={mats.steelDark}>
          <boxGeometry args={[0.42, 1.15, 0.55]} />
        </mesh>
        {bars.map((b, i) => (
          <mesh key={i} position={b.pos} castShadow material={mats.titanium}>
            <boxGeometry args={b.size} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function BoosterCluster() {
  const mats = useMats();
  const mesh = useRef<THREE.InstancedMesh>(null);
  const pumps = useRef<THREE.InstancedMesh>(null);
  const bell = useMemo(() => createBellGeometry(RAPTOR.slExit, RAPTOR.slLen), []);
  const firing = useViewer((s) => {
    if (s.appMode !== "launch") return false;
    return s.launchPhase === "ignition" || s.launchPhase === "liftoff" || s.launchPhase === "ascent";
  });

  useLayoutEffect(() => {
    if (!mesh.current || !pumps.current) return;
    const dummy = new THREE.Object3D();
    BOOSTER_ENGINES.forEach(([x, z], i) => {
      dummy.position.set(x, 0.08, z);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
      dummy.position.set(x, 0.5, z);
      dummy.updateMatrix();
      pumps.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    pumps.current.instanceMatrix.needsUpdate = true;
  }, []);

  const flameRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!flameRef.current) return;
    flameRef.current.visible = firing;
    const f = 1 + Math.sin(state.clock.elapsedTime * 38) * 0.08;
    flameRef.current.scale.set(1, f, 1);
  });

  return (
    <group>
      <instancedMesh ref={mesh} args={[bell, mats.nozzle, BOOSTER_ENGINES.length]} castShadow />
      <instancedMesh ref={pumps} args={[undefined, undefined, BOOSTER_ENGINES.length]} material={mats.pump}>
        <cylinderGeometry args={[0.28, 0.34, 0.55, 10]} />
      </instancedMesh>
      <group ref={flameRef} position={[0, -0.35, 0]}>
        <mesh rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[4.6, 16, 28, 1, true]} />
          <meshBasicMaterial
            color="#ff8a3a"
            transparent
            opacity={0.55}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh rotation={[Math.PI, 0, 0]} position={[0, 0.5, 0]}>
          <coneGeometry args={[2.3, 10, 18, 1, true]} />
          <meshBasicMaterial
            color="#ffe9b8"
            transparent
            opacity={0.75}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight color="#ff7a30" intensity={firing ? 90 : 0} distance={70} />
      </group>
    </group>
  );
}

function BoosterWeldRings() {
  const mats = useMats();
  const mesh = useRef<THREE.InstancedMesh>(null);
  const bodyH = BOOSTER.height - BOOSTER.hotStageH;
  const count = Math.round(bodyH / RING) - 1;

  useLayoutEffect(() => {
    if (!mesh.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(0, RING * (i + 1), 0);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false} material={mats.steelDark}>
      <cylinderGeometry args={[R + 0.014, R + 0.014, 0.045, 64]} />
    </instancedMesh>
  );
}

export function Booster() {
  const mats = useMats();
  const selected = useViewer((s) => s.selectedId);
  const bodyH = BOOSTER.height - BOOSTER.hotStageH;

  return (
    <group name="superheavy">
      <Part id="boosterBarrel">
        <mesh position={[0, bodyH / 2, 0]} castShadow receiveShadow material={mats.steel}>
          <cylinderGeometry args={[R, R, bodyH, 72, 1, true]} />
          <Highlight active={selected === "boosterBarrel"} />
        </mesh>
        <mesh position={[0, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.soot}>
          <ringGeometry args={[3.5, R, 56]} />
        </mesh>
        <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.soot}>
          <circleGeometry args={[3.55, 48]} />
        </mesh>
        <mesh position={[0, 4.2, 0]} material={mats.soot}>
          <cylinderGeometry args={[R + 0.008, R + 0.008, 8.4, 72, 1, true]} />
        </mesh>
        <BoosterWeldRings />
        <mesh position={[0, bodyH / 2, R + 0.12]} material={mats.steelDark}>
          <boxGeometry args={[0.48, bodyH - 8, 0.18]} />
        </mesh>
        <mesh position={[R + 0.14, 14, 0]} material={mats.black}>
          <boxGeometry args={[0.22, 4.8, 1.6]} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * (R + 0.35), 64.5, 0]} rotation={[0, 0, s * 0.15]} material={mats.steelDark}>
            <cylinderGeometry args={[0.28, 0.28, 1.4, 12]} />
          </mesh>
        ))}
      </Part>

      <Part id="hotStage" position={[0, bodyH, 0]}>
        <mesh position={[0, BOOSTER.hotStageH / 2, 0]} castShadow material={mats.soot}>
          <cylinderGeometry args={[R + 0.1, R + 0.04, BOOSTER.hotStageH, 36, 1, true]} />
          <Highlight active={selected === "hotStage"} />
        </mesh>
        {Array.from({ length: 20 }, (_, i) => {
          const a = (i / 20) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.sin(a) * (R + 0.08), BOOSTER.hotStageH * 0.5, Math.cos(a) * (R + 0.08)]}
              rotation={[0, a, 0]}
              material={mats.black}
            >
              <boxGeometry args={[0.9, 2.2, 0.1]} />
            </mesh>
          );
        })}
      </Part>

      <Part id="gridFins">
        <group position={[0, GRID_FIN.y, 0]}>
          {[Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4].map((a) => (
            <GridFin key={a} az={a} />
          ))}
        </group>
      </Part>

      <Part id="boosterEngines">
        <BoosterCluster />
      </Part>
    </group>
  );
}
