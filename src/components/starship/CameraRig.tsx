import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useViewer, type CameraView } from "@/lib/starship/store";
import { CATALOG } from "@/lib/starship/catalog";
import { BOOSTER, SHIP, STACK_H } from "@/lib/starship/constants";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

function shipBaseY(showBooster: boolean) {
  return showBooster ? BOOSTER.height : 0;
}

function visibleMid(showBooster: boolean) {
  return showBooster ? STACK_H * 0.45 : SHIP.height * 0.42;
}

const PRESETS: Record<CameraView, (booster: boolean) => { pos: THREE.Vector3; target: THREE.Vector3 }> = {
  iso: (b) => {
    const m = visibleMid(b);
    const dist = b ? 168 : 62;
    return {
      pos: new THREE.Vector3(dist * 0.58, m + (b ? 8 : 5), -dist * 0.78),
      target: new THREE.Vector3(0, m, 0),
    };
  },
  front: (b) => {
    const m = visibleMid(b);
    return { pos: new THREE.Vector3(0, m, b ? 210 : 100), target: new THREE.Vector3(0, m, 0) };
  },
  side: (b) => {
    const m = visibleMid(b);
    return { pos: new THREE.Vector3(b ? 210 : 100, m, 0), target: new THREE.Vector3(0, m, 0) };
  },
  top: (b) => {
    const top = b ? STACK_H : SHIP.height;
    return { pos: new THREE.Vector3(0.3, top + 80, 0.3), target: new THREE.Vector3(0, top * 0.45, 0) };
  },
  aft: (b) => {
    const y = shipBaseY(b);
    return { pos: new THREE.Vector3(12, y - 10, -36), target: new THREE.Vector3(0, y + 5, 0) };
  },
  engines: (b) => {
    const y = shipBaseY(b);
    return { pos: new THREE.Vector3(10, y - 6, 16), target: new THREE.Vector3(0, y + 2, 0) };
  },
  nose: (b) => {
    const y = shipBaseY(b) + SHIP.height;
    return { pos: new THREE.Vector3(14, y - 3, 20), target: new THREE.Vector3(0, y - 7, 0) };
  },
};

export function CameraRig() {
  const controls = useRef<OrbitControlsImpl>(null);
  const camera = useThree((s) => s.camera);
  const appMode = useViewer((s) => s.appMode);
  const view = useViewer((s) => s.cameraView);
  const tick = useViewer((s) => s.cameraTick);
  const focusId = useViewer((s) => s.focusId);
  const showBooster = useViewer((s) => s.showBooster);
  const flying = useRef(true);
  const destPos = useRef(PRESETS.iso(true).pos.clone());
  const destTarget = useRef(PRESETS.iso(true).target.clone());

  useEffect(() => {
    const s = useViewer.getState();
    if (s.focusId && CATALOG[s.focusId]) {
      const def = CATALOG[s.focusId]!;
      const yOff = s.showBooster && def.vehicle === "ship" ? BOOSTER.height : 0;
      destTarget.current.set(def.anchor[0], def.anchor[1] + yOff, def.anchor[2]);
      destPos.current.set(def.anchor[0] + 16, def.anchor[1] + yOff + 5, def.anchor[2] - 18);
    } else {
      const p = PRESETS[s.cameraView](s.showBooster);
      destPos.current.copy(p.pos);
      destTarget.current.copy(p.target);
    }
    flying.current = true;
  }, [view, tick, focusId, showBooster]);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.1);
    useViewer.getState().tickSim(dt);
    const s = useViewer.getState();
    const ctrl = controls.current;
    if (!ctrl) return;

    if (s.appMode === "inspect") {
      ctrl.enabled = !s.measureMode;
      if (flying.current) {
        camera.position.lerp(destPos.current, 1 - Math.exp(-3.6 * dt));
        ctrl.target.lerp(destTarget.current, 1 - Math.exp(-3.6 * dt));
        if (camera.position.distanceTo(destPos.current) < 0.35) flying.current = false;
      }
      ctrl.update();
      return;
    }

    ctrl.enabled = false;
    const alt = s.altitude;
    const base = visibleMid(s.showBooster);

    if (s.appMode === "launch") {
      const lookY = alt + base * 0.55;
      camera.position.lerp(
        new THREE.Vector3(55 + alt * 0.14, 14 + alt * 0.4, 95 + alt * 0.24),
        1 - Math.exp(-1.4 * dt),
      );
      ctrl.target.lerp(new THREE.Vector3(0, lookY, 0), 1 - Math.exp(-1.6 * dt));
      ctrl.update();
      return;
    }

    const t = s.cinematicT;
    const shot = Math.floor(t / 8) % 4;
    const local = t % 8;
    let pos: THREE.Vector3;
    let target: THREE.Vector3;
    const m = base;
    if (shot === 0) {
      const a = local * 0.22 + t * 0.05;
      const rad = s.showBooster ? 95 : 70;
      pos = new THREE.Vector3(Math.cos(a) * rad, m + 8, Math.sin(a) * rad);
      target = new THREE.Vector3(0, m, 0);
    } else if (shot === 1) {
      pos = new THREE.Vector3(22, 4, 34);
      target = new THREE.Vector3(0, m * 0.65, 0);
    } else if (shot === 2) {
      pos = new THREE.Vector3(10, shipBaseY(s.showBooster) - 5, 12);
      target = new THREE.Vector3(0, shipBaseY(s.showBooster) + 3, 0);
    } else {
      const k = local / 8;
      pos = new THREE.Vector3(24 + k * 90, 10 + k * 48, 28 + k * 80);
      target = new THREE.Vector3(0, m, 0);
    }
    camera.position.lerp(pos, 1 - Math.exp(-1.1 * dt));
    ctrl.target.lerp(target, 1 - Math.exp(-1.2 * dt));
    ctrl.update();
  });

  const inspect = appMode === "inspect";

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={8}
      maxDistance={520}
      enablePan
      target={[0, 56, 0]}
      onStart={() => {
        flying.current = false;
      }}
      enabled={inspect}
    />
  );
}
