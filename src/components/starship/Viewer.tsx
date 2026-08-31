import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { HUD } from "./HUD";
import { SceneContent } from "./Scene";
import { useViewer } from "@/lib/starship/store";

export function Viewer() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = useViewer.getState();
      if (e.key === "Escape") {
        s.select(null);
        if (s.appMode !== "inspect") s.resetVehicle();
        return;
      }
      if (e.key === "1") s.setViewMode("solid");
      if (e.key === "2") s.setViewMode("wireframe");
      if (e.key === "3") s.setViewMode("xray");
      if (e.key === "4") s.setViewMode("transparent");
      if (e.key === "e" || e.key === "E") s.toggleExplode();
      if (e.key === "g" || e.key === "G") s.toggleGrid();
      if (e.key === "l" || e.key === "L") s.startLaunch();
      if (e.key === "c" || e.key === "C") s.setAppMode("cinematic");
      if (e.key === "r" || e.key === "R") s.resetVehicle();
      if (e.key === "b" || e.key === "B") s.toggleBooster();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-bg">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          localClippingEnabled: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [92, 62, -128], fov: 34, near: 0.2, far: 6000 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.08;
          gl.localClippingEnabled = true;
        }}
        onPointerMissed={() => {
          const s = useViewer.getState();
          if (s.measureMode) return;
          s.select(null);
        }}
        style={{ touchAction: "none" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
      <HUD />
    </div>
  );
}
