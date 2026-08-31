import { useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { Grid, Sky, Stars } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { useViewer } from "@/lib/starship/store";
import { makeConcreteTexture, makeEarthTexture } from "@/lib/starship/geometry";
import { STACK_H } from "@/lib/starship/constants";

function EnvMap() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const scenario = useViewer((s) => s.scenario);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const tex = pmrem.fromScene(room, 0.04).texture;
    scene.environment = tex;
    const intensity =
      scenario === "space" || scenario === "orbit" ? 0.28 : scenario === "hangar" ? 0.75 : 1.05;
    scene.environmentIntensity = intensity;
    return () => {
      scene.environment = null;
      tex.dispose();
      pmrem.dispose();
    };
  }, [gl, scene, scenario]);

  return null;
}

function LaunchSite() {
  const concrete = useMemo(() => makeConcreteTexture(), []);
  useEffect(() => () => concrete.dispose(), [concrete]);

  return (
    <group>
      <Sky
        sunPosition={[80, 28, 40]}
        turbidity={4.5}
        rayleigh={0.85}
        mieCoefficient={0.004}
        mieDirectionalG={0.85}
      />
      <hemisphereLight args={["#c8d4e2", "#3a342c", 0.55]} />
      <directionalLight
        position={[70, 110, 40]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={2}
        shadow-camera-far={420}
        shadow-camera-left={-140}
        shadow-camera-right={140}
        shadow-camera-top={140}
        shadow-camera-bottom={-140}
        color="#fff4e0"
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]} receiveShadow>
        <circleGeometry args={[260, 64]} />
        <meshStandardMaterial map={concrete} roughness={0.92} metalness={0.04} color="#8a8c8f" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 90]} receiveShadow>
        <planeGeometry args={[1100, 800]} />
        <meshStandardMaterial color="#0c3a4a" roughness={0.35} metalness={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <ringGeometry args={[12, 30, 48]} />
        <meshStandardMaterial color="#4e5156" roughness={0.7} metalness={0.3} />
      </mesh>
      {/* Orbital Launch Mount */}
      <mesh position={[0, -3.4, 0]} receiveShadow>
        <cylinderGeometry args={[12, 13, 6.8, 8]} />
        <meshStandardMaterial color="#3a3d42" roughness={0.55} metalness={0.6} />
      </mesh>
      <mesh position={[0, -6.6, 9]}>
        <boxGeometry args={[18, 5.2, 24]} />
        <meshStandardMaterial color="#2c2f34" metalness={0.5} roughness={0.6} />
      </mesh>
      <Mechazilla />
      <TankFarm />
    </group>
  );
}

function Mechazilla() {
  const x = 18;
  const h = 156;
  return (
    <group position={[x, 0, 0]}>
      {[-4.4, 4.4].map((z) => (
        <group key={z}>
          <mesh position={[0, h / 2, z]} castShadow>
            <boxGeometry args={[2.6, h, 2.6]} />
            <meshStandardMaterial color="#2e3238" metalness={0.7} roughness={0.4} />
          </mesh>
          {Array.from({ length: 20 }, (_, i) => (
            <mesh key={i} position={[0, 8 + i * 7.2, z]}>
              <boxGeometry args={[3.4, 0.35, 3.4]} />
              <meshStandardMaterial color="#3c424a" metalness={0.65} roughness={0.45} />
            </mesh>
          ))}
        </group>
      ))}
      {Array.from({ length: 18 }, (_, i) => (
        <mesh key={i} position={[0, 10 + i * 8, 0]}>
          <boxGeometry args={[1.2, 0.4, 8.8]} />
          <meshStandardMaterial color="#3c424a" metalness={0.65} roughness={0.45} />
        </mesh>
      ))}
      {/* Chopsticks at stacked vehicle height */}
      <mesh position={[-7.2, 128, 0]} castShadow>
        <boxGeometry args={[16, 1.8, 9.4]} />
        <meshStandardMaterial color="#3a3f46" metalness={0.7} roughness={0.38} />
      </mesh>
      <mesh position={[-6.5, 74, 0]} castShadow>
        <boxGeometry args={[11, 1.3, 7.2]} />
        <meshStandardMaterial color="#3a3f46" metalness={0.7} roughness={0.38} />
      </mesh>
      <mesh position={[-5.2, 42, 0]}>
        <boxGeometry args={[8.5, 1, 2.2]} />
        <meshStandardMaterial color="#4a5060" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

function TankFarm() {
  return (
    <group position={[52, 0, -32]}>
      {[0, 15, 30].map((x) => (
        <mesh key={x} position={[x, 10, 0]} castShadow>
          <cylinderGeometry args={[5.8, 5.8, 20, 24]} />
          <meshStandardMaterial color="#c9cdd2" metalness={0.7} roughness={0.32} />
        </mesh>
      ))}
    </group>
  );
}

/** Open high-bay — floor, lights, far back wall. No enclosing box around the vehicle. */
function Hangar() {
  const concrete = useMemo(() => makeConcreteTexture(), []);
  useEffect(() => () => concrete.dispose(), [concrete]);
  const w = 140;
  const d = 120;
  const h = 78;

  return (
    <group>
      <hemisphereLight args={["#d8dde4", "#1a1c20", 0.75]} />
      <directionalLight position={[18, 70, 12]} intensity={1.5} color="#e8e4d8" />
      <directionalLight position={[-40, 30, 50]} intensity={1.0} color="#c8d4e8" />
      {[
        [-40, 20],
        [40, 20],
        [-40, -20],
        [40, -20],
      ].map(([x, z], i) => (
        <spotLight
          key={i}
          position={[x, h - 4, z]}
          angle={0.75}
          penumbra={0.55}
          intensity={48}
          distance={110}
          color="#f0efe8"
          castShadow={i === 0}
        />
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial map={concrete} roughness={0.9} metalness={0.05} color="#7a7c80" />
      </mesh>
      {/* Distant back wall only */}
      <mesh position={[0, h / 2, -d / 2]}>
        <boxGeometry args={[w, h, 0.6]} />
        <meshStandardMaterial color="#1c1e22" metalness={0.4} roughness={0.7} />
      </mesh>
      {/* Ceiling trusses — open sides, no box */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={i} position={[-w / 2 + 14 + i * 12, h - 1.5, 0]}>
          <boxGeometry args={[0.45, 1.0, d - 8]} />
          <meshStandardMaterial color="#2a2e34" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}
      {/* Corner columns */}
      {[
        [-w / 2 + 2, -d / 2 + 2],
        [w / 2 - 2, -d / 2 + 2],
        [-w / 2 + 2, d / 2 - 2],
        [w / 2 - 2, d / 2 - 2],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, h / 2, z]}>
          <boxGeometry args={[1.4, h, 1.4]} />
          <meshStandardMaterial color="#2a2e34" metalness={0.55} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Earth() {
  const tex = useMemo(() => makeEarthTexture(), []);
  useEffect(() => () => tex.dispose(), [tex]);
  const close = useViewer((s) => s.scenario === "orbit");
  const r = close ? 240 : 95;
  const pos: [number, number, number] = close ? [40, -270, -130] : [190, -45, -440];

  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[r, 64, 48]} />
        <meshStandardMaterial map={tex} roughness={0.9} metalness={0.05} />
      </mesh>
      <mesh scale={1.035}>
        <sphereGeometry args={[r, 48, 32]} />
        <meshBasicMaterial color="#4a9dff" transparent opacity={0.14} side={THREE.BackSide} />
      </mesh>
      <mesh scale={1.08}>
        <sphereGeometry args={[r, 32, 24]} />
        <meshBasicMaterial color="#7ec4ff" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function SpaceLights() {
  return (
    <>
      <Stars radius={700} depth={110} count={8000} factor={3.4} saturation={0} fade speed={0.35} />
      <directionalLight position={[90, 50, 24]} intensity={3.4} color="#fff6e8" />
      <ambientLight intensity={0.1} />
    </>
  );
}

export function World() {
  const scenario = useViewer((s) => s.scenario);
  const showGrid = useViewer((s) => s.showGrid);
  const showAxes = useViewer((s) => s.showAxes);
  const showBooster = useViewer((s) => s.showBooster);
  const pad = scenario === "launchpad" || scenario === "hangar";

  return (
    <>
      <EnvMap />
      {scenario === "launchpad" && <LaunchSite />}
      {scenario === "hangar" && <Hangar />}
      {(scenario === "space" || scenario === "orbit") && <SpaceLights />}
      {scenario === "orbit" && <Earth />}
      {scenario === "space" && <Earth />}
      {scenario === "hangar" && <color attach="background" args={["#0b0c0e"]} />}
      {(scenario === "space" || scenario === "orbit") && <color attach="background" args={["#010102"]} />}
      {showGrid && pad && (
        <Grid
          position={[0, 0.03, 0]}
          args={[160, 160]}
          cellSize={2}
          cellThickness={0.55}
          sectionSize={10}
          sectionThickness={1.05}
          cellColor="#3a4048"
          sectionColor="#6a7380"
          fadeDistance={180}
          infiniteGrid
        />
      )}
      {showAxes && <axesHelper args={[showBooster ? STACK_H * 0.25 : 20]} />}
    </>
  );
}
