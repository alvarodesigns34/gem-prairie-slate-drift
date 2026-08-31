import { useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { useViewer } from "@/lib/starship/store";
import { AFT_FLAP, FWD_FLAP, R, SHIP, Y } from "@/lib/starship/constants";
import { createAftFlapGeometry, createFwdFlapGeometry, createNoseGeometry, SHIP_SL, SHIP_VAC } from "@/lib/starship/geometry";
import { useMats } from "./materials";
import { Highlight, Part } from "./Part";
import { Raptor } from "./Raptor";

function WeldRings({ from, to, material }: { from: number; to: number; material: THREE.Material }) {
  const count = Math.max(1, Math.round((to - from) / SHIP.ringH) - 1);
  const mesh = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(0, from + (i + 1) * SHIP.ringH, 0);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count, from]);
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false} material={material}>
      <cylinderGeometry args={[R + 0.016, R + 0.016, 0.048, 72]} />
    </instancedMesh>
  );
}

function HeatShield() {
  const mats = useMats();
  const mesh = useRef<THREE.InstancedMesh>(null);
  const COUNT = 1680;
  const selected = useViewer((s) => s.selectedId === "heatShield");

  useLayoutEffect(() => {
    if (!mesh.current) return;
    const dummy = new THREE.Object3D();
    const up = new THREE.Vector3(0, 1, 0);
    const normal = new THREE.Vector3();
    let i = 0;

    const place = (x: number, y: number, z: number, nx: number, ny: number, nz: number, s = 1) => {
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(s);
      normal.set(nx, ny, nz).normalize();
      dummy.quaternion.setFromUnitVectors(up, normal);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i++, dummy.matrix);
    };

    const rows = 48;
    const cols = 26;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const y = 0.4 + row * 0.8;
        if (y > Y.pay1 + 0.2) continue;
        const offset = (row % 2) * 0.5;
        const t = (col + offset) / cols;
        const theta = -0.62 * Math.PI + t * 1.24 * Math.PI;
        const rr = R + 0.038;
        place(Math.sin(theta) * rr, y, -Math.cos(theta) * rr, Math.sin(theta), 0, -Math.cos(theta));
      }
    }

    for (let row = 0; row < 16; row++) {
      const t = (row + 0.4) / 16;
      const y = Y.pay1 + SHIP.noseH * (1 - t);
      const localT = 1 - (y - Y.pay1) / SHIP.noseH;
      const rr = R * Math.pow(Math.sin((localT * Math.PI) / 2), 0.7) + 0.042;
      const colsN = Math.max(6, Math.round(20 * (rr / R)));
      for (let col = 0; col < colsN; col++) {
        const offset = (row % 2) * 0.5;
        const u = (col + offset) / colsN;
        const theta = -0.55 * Math.PI + u * 1.1 * Math.PI;
        const slope = 0.28 * (1 - localT);
        place(Math.sin(theta) * rr, y, -Math.cos(theta) * rr, Math.sin(theta), slope, -Math.cos(theta), 0.82);
      }
    }

    dummy.scale.setScalar(0);
    dummy.position.set(0, -999, 0);
    dummy.updateMatrix();
    while (i < COUNT) {
      mesh.current.setMatrixAt(i++, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      <mesh position={[0, Y.pay1 / 2, 0]} rotation={[0, Math.PI, 0]} material={mats.tile}>
        <cylinderGeometry args={[R + 0.025, R + 0.025, Y.pay1 - 0.2, 48, 1, true, -0.62 * Math.PI, 1.24 * Math.PI]} />
        <Highlight active={selected} />
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} castShadow frustumCulled={false} material={mats.tile}>
        <cylinderGeometry args={[0.22, 0.22, 0.042, 6]} />
      </instancedMesh>
    </group>
  );
}

function Interior() {
  const mats = useMats();
  const mode = useViewer((s) => s.viewMode);
  const section = useViewer((s) => s.sectionEnabled);
  const selected = useViewer((s) => s.selectedId);
  const show = mode !== "solid" || section;

  return (
    <group visible={show}>
      <Part id="loxTank">
        <mesh position={[0, (Y.skirt1 + Y.lox1) / 2, 0]} material={mats.lox}>
          <cylinderGeometry args={[R - 0.18, R - 0.18, SHIP.loxH - 0.5, 48, 1, true]} />
          <Highlight active={selected === "loxTank"} />
        </mesh>
      </Part>
      <Part id="ch4Tank">
        <mesh position={[0, (Y.lox1 + Y.ch41) / 2, 0]} material={mats.ch4}>
          <cylinderGeometry args={[R - 0.18, R - 0.18, SHIP.ch4H - 0.5, 48, 1, true]} />
          <Highlight active={selected === "ch4Tank"} />
        </mesh>
      </Part>
      <Part id="commonDome">
        <mesh position={[0, Y.lox1, 0]} scale={[1, 0.32, 1]} material={mats.steelDark}>
          <sphereGeometry args={[R - 0.2, 40, 24]} />
          <Highlight active={selected === "commonDome"} />
        </mesh>
      </Part>
      <Part id="headerLox">
        <mesh position={[0, Y.pay1 + 10.2, 0]} material={mats.lox}>
          <sphereGeometry args={[1.5, 24, 16]} />
          <Highlight active={selected === "headerLox"} />
        </mesh>
      </Part>
      <Part id="headerCh4">
        <mesh position={[0, Y.lox1 + 1.6, 0]} material={mats.ch4}>
          <sphereGeometry args={[1.3, 24, 16]} />
          <Highlight active={selected === "headerCh4"} />
        </mesh>
      </Part>
      <Part id="downcomer">
        <mesh position={[1.15, 11.8, 0]} material={mats.steelDark}>
          <cylinderGeometry args={[0.26, 0.26, 18.6, 12]} />
          <Highlight active={selected === "downcomer"} />
        </mesh>
        <mesh position={[-0.9, 10.2, 1.1]} rotation={[0.1, 0, -0.08]} material={mats.steelDark}>
          <cylinderGeometry args={[0.15, 0.15, 11.4, 10]} />
        </mesh>
        <mesh position={[-0.9, 10.2, -1.1]} rotation={[-0.1, 0, -0.08]} material={mats.steelDark}>
          <cylinderGeometry args={[0.15, 0.15, 11.4, 10]} />
        </mesh>
      </Part>
      <Part id="thrustPuck">
        <mesh position={[0, Y.skirt1 - 0.12, 0]} material={mats.soot}>
          <cylinderGeometry args={[3.3, 3.5, 0.5, 32]} />
          <Highlight active={selected === "thrustPuck"} />
        </mesh>
      </Part>
      <Part id="copv">
        {(
          [
            [2.4, 2.1, 1.8],
            [-2.4, 2.1, 1.8],
            [2.4, 2.1, -1.8],
            [-2.4, 2.1, -1.8],
            [0, 2.4, 2.9],
            [0, 2.4, -2.9],
          ] as [number, number, number][]
        ).map((p, i) => (
          <mesh key={i} position={p} material={mats.black}>
            <sphereGeometry args={[0.4, 16, 12]} />
            <Highlight active={selected === "copv"} />
          </mesh>
        ))}
      </Part>
    </group>
  );
}

function Barrel({
  y0,
  y1,
  material,
  selected,
}: {
  y0: number;
  y1: number;
  material: THREE.Material;
  selected?: boolean;
}) {
  const h = y1 - y0;
  return (
    <mesh position={[0, (y0 + y1) / 2, 0]} castShadow receiveShadow material={material}>
      <cylinderGeometry args={[R, R, h, 72, 1, true]} />
      <Highlight active={selected} />
    </mesh>
  );
}

function noseRadius(y: number) {
  const local = (y - Y.pay1) / SHIP.noseH;
  const t = 1 - Math.max(0, Math.min(1, local));
  return R * Math.pow(Math.sin((t * Math.PI) / 2), 0.7);
}

/** Mount a flap on the cylinder: +X of the flap points radially out. Never intersects the hull. */
function FlapMount({
  az,
  y,
  radius,
  children,
}: {
  az: number;
  y: number;
  radius: number;
  children: ReactNode;
}) {
  return (
    <group position={[radius * Math.sin(az), y, radius * Math.cos(az)]} rotation={[0, az - Math.PI / 2, 0]}>
      {children}
    </group>
  );
}

function AftFlap({ az, selected }: { az: number; selected?: boolean }) {
  const mats = useMats();
  const body = useMemo(() => createAftFlapGeometry(AFT_FLAP.thick), []);
  const skin = useMemo(() => createAftFlapGeometry(0.045), []);
  const windwardZ = az > 0 ? -1 : 1;
  return (
    <FlapMount az={az} y={AFT_FLAP.y} radius={R + AFT_FLAP.standoff}>
      <mesh geometry={body} castShadow material={mats.steel}>
        <Highlight active={selected} />
      </mesh>
      <mesh geometry={skin} position={[0.02, 0, windwardZ * (AFT_FLAP.thick / 2 + 0.012)]} material={mats.tile} />
      <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={mats.steelDark}>
        <cylinderGeometry args={[0.32, 0.32, AFT_FLAP.root * 0.72, 14]} />
      </mesh>
      <mesh position={[1.6, 0.9, 0.12]} rotation={[0, 0, 1.12]} material={mats.pump}>
        <cylinderGeometry args={[0.09, 0.09, 2.8, 8]} />
      </mesh>
    </FlapMount>
  );
}

function FwdFlap({ az, selected }: { az: number; selected?: boolean }) {
  const mats = useMats();
  const body = useMemo(() => createFwdFlapGeometry(FWD_FLAP.thick), []);
  const skin = useMemo(() => createFwdFlapGeometry(0.03), []);
  const r = noseRadius(FWD_FLAP.y) + FWD_FLAP.standoff;
  const windwardZ = az > 0 ? -1 : 1;
  return (
    <FlapMount az={az} y={FWD_FLAP.y} radius={r}>
      <mesh geometry={body} castShadow material={mats.steel}>
        <Highlight active={selected} />
      </mesh>
      <mesh geometry={skin} position={[0.02, 0, windwardZ * (FWD_FLAP.thick / 2 + 0.01)]} material={mats.tile} />
      <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={mats.steelDark}>
        <cylinderGeometry args={[0.16, 0.16, FWD_FLAP.root * 0.55, 12]} />
      </mesh>
    </FlapMount>
  );
}

export function Starship() {
  const mats = useMats();
  const selected = useViewer((s) => s.selectedId);
  const nose = useMemo(() => createNoseGeometry(), []);

  return (
    <group name="starship">
      <Part id="engineBay">
        <Barrel y0={0} y1={Y.skirt1} material={mats.soot} selected={selected === "engineBay"} />
        <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.soot}>
          <ringGeometry args={[3.4, R, 56]} />
        </mesh>
        <WeldRings from={0} to={Y.skirt1} material={mats.steelDark} />
        {[0.2, Math.PI / 2 + 0.2, Math.PI + 0.2, (3 * Math.PI) / 2 + 0.2].map((a) => (
          <mesh
            key={a}
            position={[Math.sin(a) * (R + 0.14), 2.3, Math.cos(a) * (R + 0.14)]}
            rotation={[0, a, 0]}
            material={mats.black}
          >
            <boxGeometry args={[0.5, 0.62, 0.16]} />
          </mesh>
        ))}
      </Part>

      <Part id="loxTank">
        <Barrel y0={Y.skirt1} y1={Y.lox1} material={mats.steel} selected={selected === "loxTank"} />
        <WeldRings from={Y.skirt1} to={Y.lox1} material={mats.steelDark} />
      </Part>

      <Part id="ch4Tank">
        <Barrel y0={Y.lox1} y1={Y.ch41} material={mats.steel} selected={selected === "ch4Tank"} />
        <WeldRings from={Y.lox1} to={Y.ch41} material={mats.steelDark} />
      </Part>

      <Part id="payloadBay">
        <Barrel y0={Y.ch41} y1={Y.pay1} material={mats.steel} selected={selected === "payloadBay"} />
        <WeldRings from={Y.ch41} to={Y.pay1} material={mats.steelDark} />
      </Part>

      <Part id="pezDoor">
        <mesh position={[R + 0.05, (Y.ch41 + Y.pay1) / 2, 0]} castShadow material={mats.steelDark}>
          <boxGeometry args={[0.1, 4.4, 3.2]} />
          <Highlight active={selected === "pezDoor"} />
        </mesh>
        <mesh position={[R + 0.09, (Y.ch41 + Y.pay1) / 2 + 2.05, 0]} material={mats.black}>
          <boxGeometry args={[0.08, 0.14, 3.3]} />
        </mesh>
      </Part>

      <Part id="noseCone" position={[0, Y.pay1, 0]}>
        <mesh geometry={nose} castShadow receiveShadow material={mats.steel}>
          <Highlight active={selected === "noseCone"} />
        </mesh>
        <mesh position={[0, SHIP.noseH - 0.1, 0]} material={mats.tile}>
          <sphereGeometry args={[0.2, 16, 12]} />
        </mesh>
        {[0.55, 2.1, 3.65, 5.2].map((ang, i) => {
          const a = (ang / 6.28) * Math.PI * 2;
          const y = 3.8;
          const rr = noseRadius(Y.pay1 + y) + 0.1;
          return (
            <mesh key={i} position={[Math.sin(a) * rr, y, Math.cos(a) * rr]} rotation={[0, a, 0]} material={mats.black}>
              <boxGeometry args={[0.38, 0.46, 0.1]} />
            </mesh>
          );
        })}
      </Part>

      <Part id="raceway">
        <mesh position={[0, (Y.skirt1 + Y.pay1) / 2, R + 0.12]} castShadow material={mats.steelDark}>
          <boxGeometry args={[0.48, Y.pay1 - Y.skirt1 - 1.4, 0.16]} />
          <Highlight active={selected === "raceway"} />
        </mesh>
      </Part>

      <Part id="aftFlapPort">
        <AftFlap az={AFT_FLAP.azPort} selected={selected === "aftFlapPort"} />
      </Part>
      <Part id="aftFlapStbd">
        <AftFlap az={AFT_FLAP.azStbd} selected={selected === "aftFlapStbd"} />
      </Part>
      <Part id="fwdFlapPort">
        <FwdFlap az={-FWD_FLAP.halfAngle} selected={selected === "fwdFlapPort"} />
      </Part>
      <Part id="fwdFlapStbd">
        <FwdFlap az={FWD_FLAP.halfAngle} selected={selected === "fwdFlapStbd"} />
      </Part>

      <Part id="heatShield">
        <HeatShield />
      </Part>

      {SHIP_SL.map(([x, z], i) => (
        <Part key={`sl${i}`} id={`raptorSL${i + 1}` as "raptorSL1"}>
          <group position={[x, 0.12, z]}>
            <Raptor variant="sl" selected={selected === `raptorSL${i + 1}`} />
          </group>
        </Part>
      ))}
      {SHIP_VAC.map(([x, z], i) => (
        <Part key={`vac${i}`} id={`raptorVac${i + 1}` as "raptorVac1"}>
          <group position={[x, 0.12, z]}>
            <Raptor variant="vac" selected={selected === `raptorVac${i + 1}`} />
          </group>
        </Part>
      ))}

      <Interior />
    </group>
  );
}
