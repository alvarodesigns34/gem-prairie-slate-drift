import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Line, Html } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";
import { useViewer } from "@/lib/starship/store";
import { CATALOG } from "@/lib/starship/catalog";
import { BOOSTER } from "@/lib/starship/constants";

function ParticleField({
  count,
  color,
  spread,
  height,
  active,
  upward = false,
  size = 0.22,
  additive = true,
}: {
  count: number;
  color: string;
  spread: number;
  height: number;
  active: boolean;
  upward?: boolean;
  size?: number;
  additive?: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const seeds = useMemo(() => Float32Array.from({ length: count }, () => Math.random()), [count]);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    return g;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.visible = active;
    if (!active) return;
    const arr = geo.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const s = seeds[i]!;
      const life = (t * (0.35 + s * 0.5) + s) % 1;
      const a = s * Math.PI * 2;
      const r = spread * (0.15 + life) * (0.4 + s);
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = upward ? life * height : -life * height;
      arr[i * 3 + 2] = Math.sin(a) * r * 0.85;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
        sizeAttenuation
      />
    </points>
  );
}

export function LaunchFX() {
  const phase = useViewer((s) => s.launchPhase);
  const altitude = useViewer((s) => s.altitude);
  const ignition = phase === "ignition" || phase === "liftoff" || phase === "ascent";
  const deluge = phase === "countdown" || phase === "ignition" || phase === "liftoff";
  const t = useViewer((s) => s.launchTime);
  const delugeOn = deluge && t > -5.2 && altitude < 40;

  return (
    <group>
      <group position={[0, 0.2, 0]}>
        <ParticleField
          count={900}
          color="#ffb060"
          spread={5.5}
          height={28}
          active={ignition && altitude < 180}
          size={0.28}
        />
        <ParticleField
          count={500}
          color="#fff0c8"
          spread={2.8}
          height={18}
          active={ignition && altitude < 180}
          size={0.16}
        />
      </group>
      <group position={[0, 0.4, 0]}>
        <ParticleField
          count={700}
          color="#c8c4bc"
          spread={18}
          height={14}
          active={delugeOn}
          upward
          size={0.45}
          additive={false}
        />
      </group>
    </group>
  );
}

export function MeasureGizmo() {
  const a = useViewer((s) => s.measureA);
  const b = useViewer((s) => s.measureB);
  if (!a) return null;
  return (
    <group>
      <mesh position={a}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshBasicMaterial color="#e8eaed" />
      </mesh>
      {b && (
        <>
          <mesh position={b}>
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshBasicMaterial color="#e8eaed" />
          </mesh>
          <Line points={[a, b]} color="#e8eaed" lineWidth={1.5} />
          <Html
            position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]}
            center
            style={{ pointerEvents: "none" }}
          >
            <div className="rounded-sm border border-border bg-surface px-2 py-1 font-mono text-xs text-fg">
              {Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]).toFixed(2)} m
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

export function SectionPlane() {
  const enabled = useViewer((s) => s.sectionEnabled);
  const axis = useViewer((s) => s.sectionAxis);
  const pos = useViewer((s) => s.sectionPos);
  const booster = useViewer((s) => s.showBooster);
  if (!enabled) return null;

  const maxY = booster ? 140 : 54;
  const x = THREE.MathUtils.lerp(-6.2, 6.2, pos);
  const y = THREE.MathUtils.lerp(-2, maxY, pos);
  const z = THREE.MathUtils.lerp(-6.2, 6.2, pos);

  const position: [number, number, number] =
    axis === "x" ? [x, maxY / 2, 0] : axis === "y" ? [0, y, 0] : [0, maxY / 2, z];
  const rotation: [number, number, number] =
    axis === "x" ? [0, Math.PI / 2, 0] : axis === "y" ? [Math.PI / 2, 0, 0] : [0, 0, 0];

  return (
    <mesh position={position} rotation={rotation} renderOrder={2}>
      <planeGeometry args={[axis === "y" ? 20 : 24, axis === "y" ? 20 : maxY + 8]} />
      <meshBasicMaterial color="#9aa8b8" transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

export function SelectionLabel() {
  const id = useViewer((s) => s.selectedId);
  const booster = useViewer((s) => s.showBooster);
  if (!id) return null;
  const def = CATALOG[id];
  if (!def) return null;
  const yOff = booster && def.vehicle === "ship" ? BOOSTER.height : 0;
  const p: [number, number, number] = [def.anchor[0], def.anchor[1] + yOff, def.anchor[2]];
  return (
    <Html position={p} center style={{ pointerEvents: "none" }} distanceFactor={28}>
      <div className="rounded-sm border border-border bg-surface/90 px-2 py-1 font-mono text-[10px] tracking-wide text-fg whitespace-nowrap">
        {def.name}
      </div>
    </Html>
  );
}

export function PostFX() {
  const mode = useViewer((s) => s.appMode);
  const phase = useViewer((s) => s.launchPhase);
  const cinematic = mode === "cinematic";
  const launch =
    mode === "launch" && (phase === "ignition" || phase === "liftoff" || phase === "ascent");
  if (!cinematic && !launch) return null;
  return (
    <EffectComposer>
      <Bloom intensity={cinematic ? 0.45 : 1.15} luminanceThreshold={0.55} mipmapBlur />
      {cinematic ? <DepthOfField focusDistance={0.018} focalLength={0.06} bokehScale={2.2} /> : <></>}
      {cinematic ? <Vignette darkness={0.55} offset={0.28} /> : <></>}
    </EffectComposer>
  );
}
