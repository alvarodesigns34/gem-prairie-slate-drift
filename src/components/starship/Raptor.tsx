import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RAPTOR } from "@/lib/starship/constants";
import { createBellGeometry } from "@/lib/starship/geometry";
import { useMats } from "./materials";
import { Highlight } from "./Part";
import { useViewer } from "@/lib/starship/store";

export function EngineFlame({
  active,
  scale = 1,
  vac = false,
}: {
  active: boolean;
  scale?: number;
  vac?: boolean;
}) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const flicker = 1 + Math.sin(t * 47) * 0.12 + Math.sin(t * 23.7) * 0.07;
    if (outer.current) {
      outer.current.visible = active;
      outer.current.scale.set(0.85 * scale * flicker, (vac ? 2.6 : 2.15) * scale * flicker, 0.85 * scale * flicker);
    }
    if (inner.current) {
      inner.current.visible = active;
      inner.current.scale.set(0.42 * scale, (vac ? 2.1 : 1.7) * scale * flicker, 0.42 * scale);
    }
  });
  return (
    <group>
      <mesh ref={outer} position={[0, -0.15, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.55, 1, 16, 1, true]} />
        <meshBasicMaterial
          color="#ff9a4a"
          transparent
          opacity={0.72}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={inner} position={[0, -0.1, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.55, 1, 12, 1, true]} />
        <meshBasicMaterial
          color="#fff4d8"
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      <pointLight color="#ff8c3a" intensity={active ? 18 * scale : 0} distance={22} decay={2} />
    </group>
  );
}

export function Raptor({
  variant,
  selected,
}: {
  variant: "sl" | "vac";
  selected?: boolean;
}) {
  const mats = useMats();
  const vac = variant === "vac";
  const bell = useMemo(
    () => createBellGeometry(vac ? RAPTOR.vacExit : RAPTOR.slExit, vac ? RAPTOR.vacLen : RAPTOR.slLen),
    [vac],
  );
  const showFlame = useViewer((s) => {
    if (s.appMode === "cinematic" && (s.scenario === "space" || s.scenario === "orbit")) return true;
    if (s.appMode !== "launch") return false;
    if (!s.showBooster) {
      return s.launchPhase === "ignition" || s.launchPhase === "liftoff" || s.launchPhase === "ascent";
    }
    return false;
  });

  const pumpH = 0.72;
  const pumpY = 0.58;

  return (
    <group>
      <mesh position={[0, pumpY, 0]} castShadow material={mats.pump}>
        <cylinderGeometry args={[0.34, 0.4, pumpH, 16]} />
        <Highlight active={selected} />
      </mesh>
      <mesh position={[0, pumpY + 0.42, 0]} material={mats.steelDark}>
        <cylinderGeometry args={[0.22, 0.28, 0.22, 12]} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.22, 0]} material={mats.steelDark}>
        <torusGeometry args={[0.32, 0.04, 8, 20]} />
      </mesh>
      <mesh geometry={bell} castShadow material={vac ? mats.nozzleVac : mats.nozzle}>
        <Highlight active={selected} />
      </mesh>
      {!vac &&
        [0.55, 1.15, 1.75, 2.35].map((y) => (
          <mesh key={y} position={[0, -y, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.steelDark}>
            <torusGeometry args={[0.22 + y * 0.16, 0.016, 6, 22]} />
          </mesh>
        ))}
      <mesh
        position={[0, vac ? -RAPTOR.vacLen + 0.08 : -RAPTOR.slLen + 0.08, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={mats.black}
      >
        <torusGeometry args={[vac ? RAPTOR.vacExit : RAPTOR.slExit, 0.028, 6, 28]} />
      </mesh>
      <EngineFlame active={showFlame} vac={vac} scale={vac ? 1.2 : 1} />
    </group>
  );
}
