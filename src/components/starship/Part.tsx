import { useCursor, Outlines } from "@react-three/drei";
import { useViewer } from "@/lib/starship/store";
import { CATALOG } from "@/lib/starship/catalog";
import { smoothstep } from "@/lib/utils";
import type { ThreeEvent } from "@react-three/fiber";
import type { ReactNode } from "react";

function onPartClick(id: string, e: ThreeEvent<MouseEvent>) {
  e.stopPropagation();
  const s = useViewer.getState();
  if (s.measureMode) {
    s.setMeasurePoint([e.point.x, e.point.y, e.point.z]);
    return;
  }
  s.select(s.selectedId === id ? null : id);
}

export function Part({
  id,
  children,
  position,
  rotation,
}: {
  id: string;
  children: ReactNode;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const exploded = useViewer((s) => s.exploded);
  const selected = useViewer((s) => s.selectedId === id);
  const hovered = useViewer((s) => s.hoveredId === id);
  useCursor(hovered || selected);
  const def = CATALOG[id];
  const t = smoothstep(exploded);
  const ex = def?.explode ?? [0, 0, 0];
  const p0 = position ?? [0, 0, 0];
  const pos: [number, number, number] = [p0[0] + ex[0] * t, p0[1] + ex[1] * t, p0[2] + ex[2] * t];

  return (
    <group
      name={id}
      position={pos}
      rotation={rotation}
      onClick={(e) => onPartClick(id, e)}
      onPointerOver={(e) => {
        e.stopPropagation();
        useViewer.getState().setHovered(id);
      }}
      onPointerOut={() => {
        if (useViewer.getState().hoveredId === id) useViewer.getState().setHovered(null);
      }}
    >
      {children}
    </group>
  );
}

export function Highlight({ active }: { active?: boolean }) {
  if (!active) return null;
  return <Outlines thickness={1.15} color="#f2f4f6" angle={0.8} />;
}
