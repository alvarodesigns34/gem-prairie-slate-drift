import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import { useViewer } from "@/lib/starship/store";
import { BOOSTER, STACK_H } from "@/lib/starship/constants";
import { MaterialsProvider } from "./materials";
import { Starship } from "./Starship";
import { Booster } from "./Booster";
import { World } from "./Environments";
import { CameraRig } from "./CameraRig";
import { LaunchFX, MeasureGizmo, SectionPlane, SelectionLabel, PostFX } from "./Effects";

export function SceneContent() {
  const enabled = useViewer((s) => s.sectionEnabled);
  const axis = useViewer((s) => s.sectionAxis);
  const pos = useViewer((s) => s.sectionPos);
  const booster = useViewer((s) => s.showBooster);
  const altitude = useViewer((s) => s.altitude);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(1, 0, 0), 0), []);
  const planes = useMemo(() => [plane], [plane]);
  const empty = useMemo(() => [] as THREE.Plane[], []);

  useLayoutEffect(() => {
    if (!enabled) {
      plane.normal.set(1, 0, 0);
      plane.constant = 1e5;
      return;
    }
    const maxY = booster ? STACK_H + 6 : 54;
    if (axis === "x") {
      plane.normal.set(1, 0, 0);
      plane.constant = -THREE.MathUtils.lerp(-6.2, 6.2, pos);
    } else if (axis === "z") {
      plane.normal.set(0, 0, 1);
      plane.constant = -THREE.MathUtils.lerp(-6.2, 6.2, pos);
    } else {
      plane.normal.set(0, 1, 0);
      plane.constant = -THREE.MathUtils.lerp(-2, maxY, pos);
    }
  }, [enabled, axis, pos, booster, plane]);

  return (
    <MaterialsProvider planes={enabled ? planes : empty}>
      <CameraRig />
      <World />
      <group position={[0, altitude, 0]}>
        {booster && <Booster />}
        <group position={[0, booster ? BOOSTER.height : 0, 0]}>
          <Starship />
        </group>
      </group>
      <LaunchFX />
      <MeasureGizmo />
      <SectionPlane />
      <SelectionLabel />
      <PostFX />
      <ambientLight intensity={0.38} />
      <directionalLight position={[50, 70, 35]} intensity={1.15} color="#f2f0ea" />
    </MaterialsProvider>
  );
}
