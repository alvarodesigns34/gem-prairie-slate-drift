import { useMemo } from "react";
import {
  Axis3d,
  Box,
  Camera,
  CircleDashed,
  Clapperboard,
  Grid3x3,
  Layers,
  Rocket,
  RotateCcw,
  Ruler,
  Scissors,
  Spline,
  UnfoldVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useViewer,
  type AppMode,
  type CameraView,
  type Scenario,
  type ViewMode,
} from "@/lib/starship/store";
import { CATALOG, CATALOG_LIST, GROUPS } from "@/lib/starship/catalog";

function Tool({
  active,
  onClick,
  label,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={cn(
        "flex h-11 min-w-11 items-center justify-center gap-2 rounded-md px-3 font-sans text-xs font-medium tracking-wide transition-colors duration-150",
        active ? "bg-accent text-bg" : "bg-surface-2 text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-8 rounded-sm px-2.5 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors duration-150",
        active ? "bg-accent text-bg" : "text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

const VIEWS: { id: ViewMode; label: string; icon: typeof Box }[] = [
  { id: "solid", label: "Solid", icon: Box },
  { id: "wireframe", label: "Wireframe", icon: Spline },
  { id: "xray", label: "X-Ray", icon: CircleDashed },
  { id: "transparent", label: "Transparent", icon: Layers },
];

const SCENARIOS: { id: Scenario; label: string }[] = [
  { id: "hangar", label: "Hangar" },
  { id: "launchpad", label: "Launch Site" },
  { id: "space", label: "Space" },
  { id: "orbit", label: "Earth Orbit" },
];

const CAMS: { id: CameraView; label: string }[] = [
  { id: "iso", label: "ISO" },
  { id: "front", label: "Front" },
  { id: "side", label: "Side" },
  { id: "top", label: "Top" },
  { id: "aft", label: "Aft" },
  { id: "engines", label: "Engines" },
  { id: "nose", label: "Nose" },
];

const MODES: { id: AppMode; label: string; icon: typeof Box }[] = [
  { id: "inspect", label: "Inspect", icon: Box },
  { id: "launch", label: "Launch", icon: Rocket },
  { id: "cinematic", label: "Cinema", icon: Clapperboard },
];

function formatT(t: number) {
  const sign = t < 0 ? "-" : "+";
  const a = Math.abs(t);
  const m = Math.floor(a / 60);
  const s = a % 60;
  return `${sign}${String(m).padStart(2, "0")}:${s.toFixed(1).padStart(4, "0")}`;
}

export function HUD() {
  const viewMode = useViewer((s) => s.viewMode);
  const scenario = useViewer((s) => s.scenario);
  const appMode = useViewer((s) => s.appMode);
  const cameraView = useViewer((s) => s.cameraView);
  const explodeTarget = useViewer((s) => s.explodeTarget);
  const sectionEnabled = useViewer((s) => s.sectionEnabled);
  const sectionAxis = useViewer((s) => s.sectionAxis);
  const sectionPos = useViewer((s) => s.sectionPos);
  const showGrid = useViewer((s) => s.showGrid);
  const showAxes = useViewer((s) => s.showAxes);
  const measureMode = useViewer((s) => s.measureMode);
  const selectedId = useViewer((s) => s.selectedId);
  const showBooster = useViewer((s) => s.showBooster);
  const launchPhase = useViewer((s) => s.launchPhase);
  const launchTime = useViewer((s) => s.launchTime);
  const altitude = useViewer((s) => s.altitude);
  const velocity = useViewer((s) => s.velocity);

  const selected = selectedId ? CATALOG[selectedId] : null;
  const grouped = useMemo(() => {
    return GROUPS.map((g) => ({
      g,
      items: CATALOG_LIST.filter((c) => c.group === g).filter((c) => showBooster || c.vehicle === "ship"),
    })).filter((x) => x.items.length);
  }, [showBooster]);

  const launching = appMode === "launch";
  const showCount =
    launching &&
    (launchPhase === "countdown" || launchPhase === "ignition" || launchPhase === "liftoff");

  return (
    <div className="pointer-events-none absolute inset-0 z-10 text-fg">
      <header className="pointer-events-auto absolute top-0 right-0 left-0 flex items-center justify-between gap-3 border-b border-border bg-bg/80 px-4 py-3 backdrop-blur-sm">
        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-[0.28em] text-muted uppercase">
            {showBooster ? "Stack · Block 2" : "Vehicle S37 · Block 2"}
          </p>
          <h1 className="truncate font-sans text-lg font-medium tracking-tight text-balance">
            {showBooster ? "STARSHIP / SUPER HEAVY" : "STARSHIP"}
          </h1>
        </div>
        <div className="hidden items-center gap-1 md:flex">
          {MODES.map((m) => (
            <Tool
              key={m.id}
              label={m.label}
              active={appMode === m.id}
              onClick={() => useViewer.getState().setAppMode(m.id)}
            >
              <m.icon className="size-4" strokeWidth={1.75} />
              <span className="hidden lg:inline">{m.label}</span>
            </Tool>
          ))}
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-wider text-muted tabular-nums">
          <span className={launching ? "text-go" : ""}>{formatT(launching ? launchTime : 0)}</span>
          <span className="text-subtle">UTC</span>
        </div>
      </header>

      <aside className="pointer-events-auto absolute top-20 left-3 hidden w-56 flex-col gap-2 md:flex">
        <div className="rounded-lg border border-border bg-surface/80 p-2 backdrop-blur-sm">
          <p className="mb-2 px-1 font-mono text-[10px] tracking-[0.2em] text-subtle uppercase">Display</p>
          <div className="grid grid-cols-2 gap-1">
            {VIEWS.map((v) => (
              <Tool
                key={v.id}
                label={v.label}
                active={viewMode === v.id}
                onClick={() => useViewer.getState().setViewMode(v.id)}
              >
                <v.icon className="size-3.5" strokeWidth={1.75} />
                <span>{v.label}</span>
              </Tool>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-surface/80 p-2 backdrop-blur-sm">
          <p className="mb-2 px-1 font-mono text-[10px] tracking-[0.2em] text-subtle uppercase">CAD</p>
          <div className="flex flex-wrap gap-1">
            <Tool
              label="Exploded view"
              active={explodeTarget > 0.5}
              onClick={() => useViewer.getState().toggleExplode()}
            >
              <UnfoldVertical className="size-3.5" strokeWidth={1.75} />
            </Tool>
            <Tool
              label="Section cut"
              active={sectionEnabled}
              onClick={() => useViewer.getState().setSectionEnabled(!sectionEnabled)}
            >
              <Scissors className="size-3.5" strokeWidth={1.75} />
            </Tool>
            <Tool label="Grid" active={showGrid} onClick={() => useViewer.getState().toggleGrid()}>
              <Grid3x3 className="size-3.5" strokeWidth={1.75} />
            </Tool>
            <Tool label="Axes" active={showAxes} onClick={() => useViewer.getState().toggleAxes()}>
              <Axis3d className="size-3.5" strokeWidth={1.75} />
            </Tool>
            <Tool label="Measure" active={measureMode} onClick={() => useViewer.getState().toggleMeasure()}>
              <Ruler className="size-3.5" strokeWidth={1.75} />
            </Tool>
            <Tool label="Reset" onClick={() => useViewer.getState().resetVehicle()}>
              <RotateCcw className="size-3.5" strokeWidth={1.75} />
            </Tool>
          </div>
          {sectionEnabled && (
            <div className="mt-2 space-y-2 px-1">
              <div className="flex gap-1">
                {(["x", "y", "z"] as const).map((a) => (
                  <Chip
                    key={a}
                    active={sectionAxis === a}
                    onClick={() => useViewer.getState().setSectionAxis(a)}
                  >
                    {a}
                  </Chip>
                ))}
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.004}
                value={sectionPos}
                onChange={(e) => useViewer.getState().setSectionPos(Number(e.target.value))}
                className="h-1 w-full accent-accent"
              />
            </div>
          )}
        </div>
        <div className="rounded-lg border border-border bg-surface/80 p-2 backdrop-blur-sm">
          <p className="mb-2 px-1 font-mono text-[10px] tracking-[0.2em] text-subtle uppercase">Camera</p>
          <div className="flex flex-wrap gap-1">
            {CAMS.map((c) => (
              <Chip
                key={c.id}
                active={cameraView === c.id && appMode === "inspect"}
                onClick={() => useViewer.getState().setCameraView(c.id)}
              >
                {c.label}
              </Chip>
            ))}
          </div>
        </div>
      </aside>

      <aside className="pointer-events-auto absolute top-20 right-3 hidden w-64 flex-col gap-2 lg:flex">
        <div className="rounded-lg border border-border bg-surface/80 p-3 backdrop-blur-sm">
          <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-subtle uppercase">Scenario</p>
          <div className="flex flex-wrap gap-1">
            {SCENARIOS.map((sc) => (
              <Chip
                key={sc.id}
                active={scenario === sc.id}
                onClick={() => useViewer.getState().setScenario(sc.id)}
              >
                {sc.label}
              </Chip>
            ))}
          </div>
          <button
            type="button"
            onClick={() => useViewer.getState().toggleBooster()}
            className="mt-2 h-8 w-full rounded-sm bg-surface-2 font-mono text-[10px] tracking-[0.16em] text-muted uppercase hover:text-fg"
          >
            {showBooster ? "Stack · Super Heavy" : "Ship only"}
          </button>
        </div>

        <div className="max-h-[42vh] overflow-auto rounded-lg border border-border bg-surface/80 p-3 backdrop-blur-sm">
          {selected ? (
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-subtle uppercase">{selected.group}</p>
              <h2 className="mt-1 font-sans text-base font-medium tracking-tight">{selected.name}</h2>
              <p className="mt-2 text-pretty text-xs leading-relaxed text-muted">{selected.summary}</p>
              <dl className="mt-3 space-y-1">
                {selected.specs.map((sp) => (
                  <div key={sp.label} className="flex justify-between gap-3 font-mono text-[11px]">
                    <dt className="text-subtle">{sp.label}</dt>
                    <dd className="text-fg tabular-nums">{sp.value}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                onClick={() => useViewer.getState().setFocus(selected.id)}
                className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-md bg-accent text-xs font-medium text-bg"
              >
                <Camera className="size-3.5" strokeWidth={1.75} />
                Focus
              </button>
            </div>
          ) : (
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-subtle uppercase">Components</p>
              <p className="mt-1 text-xs text-muted">Select a part on the vehicle or from the list.</p>
              <div className="mt-3 space-y-3">
                {grouped.map(({ g, items }) => (
                  <div key={g}>
                    <p className="mb-1 font-mono text-[10px] tracking-[0.16em] text-subtle uppercase">{g}</p>
                    <ul className="space-y-0.5">
                      {items.map((c) => (
                        <li key={c.id}>
                          <button
                            type="button"
                            onClick={() => useViewer.getState().select(c.id)}
                            className="w-full rounded-sm px-1 py-1.5 text-left text-xs text-muted hover:bg-surface-2 hover:text-fg"
                          >
                            {c.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      <footer className="pointer-events-auto absolute right-0 bottom-0 left-0 flex flex-col gap-2 border-t border-border bg-bg/80 px-3 py-2 backdrop-blur-sm md:flex-row md:flex-wrap md:items-center md:justify-between md:px-4">
        <div className="flex flex-col gap-1 md:hidden">
          <div className="flex gap-1 overflow-x-auto">
            {MODES.map((m) => (
              <Tool
                key={m.id}
                label={m.label}
                active={appMode === m.id}
                onClick={() => useViewer.getState().setAppMode(m.id)}
              >
                <m.icon className="size-4" strokeWidth={1.75} />
              </Tool>
            ))}
            <Tool
              label="Explode"
              active={explodeTarget > 0.5}
              onClick={() => useViewer.getState().toggleExplode()}
            >
              <UnfoldVertical className="size-4" strokeWidth={1.75} />
            </Tool>
            <Tool
              label="Section"
              active={sectionEnabled}
              onClick={() => useViewer.getState().setSectionEnabled(!sectionEnabled)}
            >
              <Scissors className="size-4" strokeWidth={1.75} />
            </Tool>
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {VIEWS.map((v) => (
              <Chip
                key={v.id}
                active={viewMode === v.id}
                onClick={() => useViewer.getState().setViewMode(v.id)}
              >
                {v.label}
              </Chip>
            ))}
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {SCENARIOS.map((sc) => (
              <Chip
                key={sc.id}
                active={scenario === sc.id}
                onClick={() => useViewer.getState().setScenario(sc.id)}
              >
                {sc.label}
              </Chip>
            ))}
          </div>
        </div>
        <dl className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] tracking-wide tabular-nums">
          <div className="flex gap-2">
            <dt className="text-subtle">ALT</dt>
            <dd>{altitude.toFixed(1)} m</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-subtle">VEL</dt>
            <dd>{velocity.toFixed(1)} m/s</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-subtle">Ø</dt>
            <dd>9.00 m</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-subtle">H</dt>
            <dd>{showBooster ? "124.1 m" : "52.1 m"}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-subtle">MODE</dt>
            <dd className="uppercase">{viewMode}</dd>
          </div>
        </dl>
        <p className="hidden font-mono text-[10px] tracking-[0.16em] text-subtle uppercase sm:block">
          Drag orbit · Scroll zoom · Click select
        </p>
      </footer>

      {showCount && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="font-mono text-[10px] tracking-[0.4em] text-muted uppercase">
            {launchPhase === "countdown" ? "Terminal count" : launchPhase === "ignition" ? "Engine start" : "Liftoff"}
          </p>
          <p className="font-mono text-6xl font-medium tracking-tight text-fg tabular-nums md:text-7xl">
            {launchTime < 0 ? `T${formatT(launchTime)}` : "LIFTOFF"}
          </p>
        </div>
      )}
    </div>
  );
}
