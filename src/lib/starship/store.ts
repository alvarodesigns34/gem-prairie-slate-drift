import { create } from "zustand";
import { CATALOG } from "./catalog";

export type ViewMode = "solid" | "wireframe" | "xray" | "transparent";
export type Scenario = "launchpad" | "hangar" | "space" | "orbit";
export type AppMode = "inspect" | "launch" | "cinematic";
export type CameraView = "iso" | "front" | "side" | "top" | "aft" | "engines" | "nose";
export type SectionAxis = "x" | "y" | "z";
export type LaunchPhase = "idle" | "countdown" | "ignition" | "liftoff" | "ascent" | "complete";
export type Point = [number, number, number] | null;

type ViewerState = {
  viewMode: ViewMode;
  scenario: Scenario;
  appMode: AppMode;
  cameraView: CameraView;
  cameraTick: number;
  focusId: string | null;
  explodeTarget: number;
  exploded: number;
  sectionEnabled: boolean;
  sectionAxis: SectionAxis;
  sectionPos: number;
  showGrid: boolean;
  showAxes: boolean;
  measureMode: boolean;
  measureA: Point;
  measureB: Point;
  selectedId: string | null;
  hoveredId: string | null;
  showBooster: boolean;
  launchPhase: LaunchPhase;
  launchTime: number;
  altitude: number;
  velocity: number;
  cinematicT: number;
  setViewMode: (v: ViewMode) => void;
  setScenario: (s: Scenario) => void;
  setAppMode: (m: AppMode) => void;
  setCameraView: (v: CameraView) => void;
  setFocus: (id: string | null) => void;
  toggleExplode: () => void;
  setExploded: (n: number) => void;
  setSectionEnabled: (v: boolean) => void;
  setSectionAxis: (a: SectionAxis) => void;
  setSectionPos: (n: number) => void;
  toggleGrid: () => void;
  toggleAxes: () => void;
  toggleMeasure: () => void;
  setMeasurePoint: (p: [number, number, number]) => void;
  clearMeasure: () => void;
  select: (id: string | null) => void;
  setHovered: (id: string | null) => void;
  toggleBooster: () => void;
  startLaunch: () => void;
  resetVehicle: () => void;
  tickSim: (dt: number) => void;
};

const scenarioBooster: Record<Scenario, boolean> = {
  launchpad: true,
  hangar: false,
  space: false,
  orbit: false,
};

export const useViewer = create<ViewerState>((set, get) => ({
  viewMode: "solid",
  scenario: "launchpad",
  appMode: "inspect",
  cameraView: "iso",
  cameraTick: 0,
  focusId: null,
  explodeTarget: 0,
  exploded: 0,
  sectionEnabled: false,
  sectionAxis: "x",
  sectionPos: 0.52,
  showGrid: false,
  showAxes: false,
  measureMode: false,
  measureA: null,
  measureB: null,
  selectedId: null,
  hoveredId: null,
  showBooster: true,
  launchPhase: "idle",
  launchTime: -10,
  altitude: 0,
  velocity: 0,
  cinematicT: 0,

  setViewMode: (viewMode) => set({ viewMode }),
  setScenario: (scenario) =>
    set({
      scenario,
      showBooster: scenarioBooster[scenario],
      appMode: "inspect",
      launchPhase: "idle",
      altitude: 0,
      velocity: 0,
      launchTime: -10,
      cameraTick: get().cameraTick + 1,
    }),
  setAppMode: (appMode) => {
    if (appMode === "launch") {
      set({
        appMode,
        scenario: "launchpad",
        showBooster: true,
        explodeTarget: 0,
        sectionEnabled: false,
        measureMode: false,
        launchPhase: "countdown",
        launchTime: -10,
        altitude: 0,
        velocity: 0,
        cameraTick: get().cameraTick + 1,
      });
      return;
    }
    if (appMode === "inspect") {
      set({
        appMode,
        launchPhase: "idle",
        altitude: 0,
        velocity: 0,
        launchTime: -10,
      });
      return;
    }
    set({ appMode, cinematicT: 0 });
  },
  setCameraView: (cameraView) =>
    set({
      cameraView,
      cameraTick: get().cameraTick + 1,
      focusId: null,
      appMode: "inspect",
    }),
  setFocus: (focusId) =>
    set({
      focusId,
      cameraTick: get().cameraTick + 1,
      appMode: "inspect",
      selectedId: focusId,
    }),
  toggleExplode: () => set({ explodeTarget: get().explodeTarget > 0.5 ? 0 : 1 }),
  setExploded: (exploded) => set({ exploded }),
  setSectionEnabled: (sectionEnabled) => set({ sectionEnabled }),
  setSectionAxis: (sectionAxis) => set({ sectionAxis }),
  setSectionPos: (sectionPos) => set({ sectionPos }),
  toggleGrid: () => set({ showGrid: !get().showGrid }),
  toggleAxes: () => set({ showAxes: !get().showAxes }),
  toggleMeasure: () =>
    set({
      measureMode: !get().measureMode,
      measureA: null,
      measureB: null,
    }),
  setMeasurePoint: (p) => {
    const { measureA, measureB } = get();
    if (!measureA || (measureA && measureB)) {
      set({ measureA: p, measureB: null });
    } else {
      set({ measureB: p });
    }
  },
  clearMeasure: () => set({ measureA: null, measureB: null, measureMode: false }),
  select: (selectedId) => {
    if (selectedId && !CATALOG[selectedId]) return;
    set({ selectedId });
  },
  setHovered: (hoveredId) => set({ hoveredId }),
  toggleBooster: () => set({ showBooster: !get().showBooster, cameraTick: get().cameraTick + 1 }),
  startLaunch: () => get().setAppMode("launch"),
  resetVehicle: () =>
    set({
      appMode: "inspect",
      launchPhase: "idle",
      launchTime: -10,
      altitude: 0,
      velocity: 0,
      explodeTarget: 0,
      cinematicT: 0,
      cameraTick: get().cameraTick + 1,
    }),
  tickSim: (dt) => {
    const s = get();
    const exploded = s.exploded + (s.explodeTarget - s.exploded) * (1 - Math.exp(-5.2 * dt));
    const patch: Partial<ViewerState> = {};
    if (Math.abs(exploded - s.exploded) > 0.00015) patch.exploded = exploded;

    if (s.appMode === "cinematic") {
      patch.cinematicT = s.cinematicT + dt;
    }

    if (s.appMode === "launch") {
      let { launchPhase, launchTime, altitude, velocity } = s;
      launchTime += dt;
      if (launchPhase === "countdown" && launchTime >= -3.15) launchPhase = "ignition";
      if ((launchPhase === "countdown" || launchPhase === "ignition") && launchTime >= 0) {
        launchPhase = "liftoff";
      }
      if (launchPhase === "liftoff" || launchPhase === "ascent") {
        const accel = launchPhase === "liftoff" ? 9.5 : 16.5;
        velocity += accel * dt;
        altitude += velocity * dt;
        if (altitude > 14) launchPhase = "ascent";
        if (altitude > 520) launchPhase = "complete";
      }
      patch.launchPhase = launchPhase;
      patch.launchTime = launchTime;
      patch.altitude = altitude;
      patch.velocity = velocity;
    }

    if (Object.keys(patch).length) set(patch as ViewerState);
  },
}));
