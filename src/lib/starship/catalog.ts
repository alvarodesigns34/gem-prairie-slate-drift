export type Vec3 = [number, number, number];

export type ComponentDef = {
  id: string;
  name: string;
  group: string;
  vehicle: "ship" | "booster";
  summary: string;
  specs: { label: string; value: string }[];
  explode: Vec3;
  anchor: Vec3;
};

export const CATALOG: Record<string, ComponentDef> = {
  noseCone: {
    id: "noseCone",
    name: "Nose Cone",
    group: "Forward",
    vehicle: "ship",
    summary:
      "Ogive nose of 304L stainless. Houses the payload volume extension, LOX header tank, and forward RCS. Windward face carries hexagonal TPS tiles.",
    specs: [
      { label: "Material", value: "304L stainless" },
      { label: "Height", value: "13.67 m" },
      { label: "Base Ø", value: "9.0 m" },
    ],
    explode: [0, 16, 0],
    anchor: [0, 46, 0],
  },
  payloadBay: {
    id: "payloadBay",
    name: "Payload Bay",
    group: "Forward",
    vehicle: "ship",
    summary:
      "Block 2 short bay (3 rings). Cargo / Pez dispenser volume, partially carried into the nose cone to maximize propellant.",
    specs: [
      { label: "Height", value: "5.49 m" },
      { label: "Volume class", value: "Cargo / Pez" },
      { label: "Rings", value: "3" },
    ],
    explode: [0, 9, 0],
    anchor: [0, 36.2, 0],
  },
  pezDoor: {
    id: "pezDoor",
    name: "Pez Dispenser Door",
    group: "Forward",
    vehicle: "ship",
    summary:
      "Side-opening payload door used to deploy Starlink stacks. Hinged panel on the payload barrel.",
    specs: [
      { label: "Type", value: "Pez / cargo door" },
      { label: "Location", value: "Starboard bay" },
    ],
    explode: [10, 8, 0],
    anchor: [4.6, 36.2, 0],
  },
  fwdFlapPort: {
    id: "fwdFlapPort",
    name: "Forward Flap — Port",
    group: "Aero",
    vehicle: "ship",
    summary:
      "Block 2 canard. Thinner, more leeward, and swept versus Block 1. Controls pitch/roll during entry and landing flip.",
    specs: [
      { label: "Span", value: "4.7 m" },
      { label: "Actuation", value: "Electric" },
      { label: "Side", value: "Port" },
    ],
    explode: [-14, 5, 8],
    anchor: [-4.8, 40.2, 1.6],
  },
  fwdFlapStbd: {
    id: "fwdFlapStbd",
    name: "Forward Flap — Starboard",
    group: "Aero",
    vehicle: "ship",
    summary:
      "Block 2 canard, starboard. Relocated leeward after Block 1 heating issues on the windward hinge line.",
    specs: [
      { label: "Span", value: "4.7 m" },
      { label: "Actuation", value: "Electric" },
      { label: "Side", value: "Starboard" },
    ],
    explode: [14, 5, 8],
    anchor: [4.8, 40.2, 1.6],
  },
  ch4Tank: {
    id: "ch4Tank",
    name: "Main CH4 Tank",
    group: "Propellant",
    vehicle: "ship",
    summary:
      "Forward main methane tank. Shares a common dome with the LOX tank. Feeds Raptor via downcomers.",
    specs: [
      { label: "Propellant", value: "LCH4" },
      { label: "Height", value: "12.81 m" },
      { label: "Wall", value: "304L, 3–4 mm" },
    ],
    explode: [0, 3.5, 0],
    anchor: [0, 26.5, 0],
  },
  commonDome: {
    id: "commonDome",
    name: "Common Dome",
    group: "Propellant",
    vehicle: "ship",
    summary:
      "Shared bulkhead between LOX (aft) and CH4 (forward). Carries the CH4 header tank on the methane side.",
    specs: [
      { label: "Type", value: "Ellipsoidal bulkhead" },
      { label: "Interface", value: "LOX / CH4" },
    ],
    explode: [11, 0, 0],
    anchor: [0, 19.6, 0],
  },
  loxTank: {
    id: "loxTank",
    name: "Main LOX Tank",
    group: "Propellant",
    vehicle: "ship",
    summary:
      "Aft liquid oxygen tank. Largest single volume on the ship. Supplies the engine bay through the thrust puck.",
    specs: [
      { label: "Propellant", value: "LOX" },
      { label: "Height", value: "14.64 m" },
      { label: "Temp", value: "90 K" },
    ],
    explode: [0, -3, 0],
    anchor: [0, 13, 0],
  },
  headerLox: {
    id: "headerLox",
    name: "LOX Header Tank",
    group: "Propellant",
    vehicle: "ship",
    summary:
      "Nose-mounted header tank that keeps LOX at the engines during the landing flip, when main-tank residuals slosh forward.",
    specs: [
      { label: "Location", value: "Nose" },
      { label: "Role", value: "Landing burn" },
    ],
    explode: [0, 18, 8],
    anchor: [0, 49.5, 0],
  },
  headerCh4: {
    id: "headerCh4",
    name: "CH4 Header Tank",
    group: "Propellant",
    vehicle: "ship",
    summary:
      "Methane header near the common dome. Dedicated landing-burn reservoir independent of main-tank orientation.",
    specs: [
      { label: "Location", value: "Common dome" },
      { label: "Role", value: "Landing burn" },
    ],
    explode: [-10, 1, 0],
    anchor: [0, 21.2, 0],
  },
  aftFlapPort: {
    id: "aftFlapPort",
    name: "Aft Flap — Port",
    group: "Aero",
    vehicle: "ship",
    summary:
      "Large aft control surface. Provides pitch authority in the belly-flop and acts as a body flap on landing. Windward face is tiled.",
    specs: [
      { label: "Span", value: "6.05 m" },
      { label: "Actuators", value: "1 × 3-motor" },
      { label: "Side", value: "Port" },
    ],
    explode: [-14, -2, 0],
    anchor: [-10.7, 7.6, 0],
  },
  aftFlapStbd: {
    id: "aftFlapStbd",
    name: "Aft Flap — Starboard",
    group: "Aero",
    vehicle: "ship",
    summary: "Starboard aft flap. Single actuator with three motors on Block 2/3 vehicles.",
    specs: [
      { label: "Span", value: "6.05 m" },
      { label: "Actuators", value: "1 × 3-motor" },
      { label: "Side", value: "Starboard" },
    ],
    explode: [14, -2, 0],
    anchor: [10.7, 7.6, 0],
  },
  heatShield: {
    id: "heatShield",
    name: "TPS Heat Shield",
    group: "Thermal",
    vehicle: "ship",
    summary:
      "Hexagonal silica tiles on the windward side, ~18,000 on a full ship. Pins, crunch-wrap gap filler, and an ablative underlayer on later Blocks.",
    specs: [
      { label: "Tiles", value: "~18,000" },
      { label: "Temp", value: "1,400 °C" },
      { label: "Mass (B1)", value: "10.5 t" },
    ],
    explode: [0, 0, -12],
    anchor: [0, 22, -4.6],
  },
  engineBay: {
    id: "engineBay",
    name: "Aft Skirt / Engine Bay",
    group: "Propulsion",
    vehicle: "ship",
    summary:
      "Aft skirt, thrust puck, COPVs, and engine mounts. Six Raptors gimbal through the puck. Sooted from static fires and flight.",
    specs: [
      { label: "Height", value: "5.49 m" },
      { label: "Engines", value: "6 × Raptor" },
    ],
    explode: [0, -8, 0],
    anchor: [0, 3.1, 0],
  },
  thrustPuck: {
    id: "thrustPuck",
    name: "Thrust Puck",
    group: "Propulsion",
    vehicle: "ship",
    summary:
      "Hardened thrust structure transferring Raptor loads into the LOX tank barrel and common dome load path.",
    specs: [
      { label: "Type", value: "Thrust structure" },
      { label: "Load path", value: "6 × Raptor" },
    ],
    explode: [0, -10, 0],
    anchor: [0, 6.0, 0],
  },
  downcomer: {
    id: "downcomer",
    name: "Downcomer Assembly",
    group: "Propulsion",
    vehicle: "ship",
    summary:
      "Block 2 uses a shared downcomer for the three center SL Raptors and separate vacuum-engine downcomers.",
    specs: [
      { label: "SL", value: "Shared" },
      { label: "Vac", value: "Independent" },
    ],
    explode: [8, -4, 0],
    anchor: [1.2, 12, 0],
  },
  copv: {
    id: "copv",
    name: "COPV Bank",
    group: "Propulsion",
    vehicle: "ship",
    summary: "Composite overwrapped pressure vessels in the engine bay for helium / autogenous pressurant.",
    specs: [
      { label: "Type", value: "COPV" },
      { label: "Location", value: "Engine bay" },
    ],
    explode: [9, -7, 4],
    anchor: [2.6, 2.4, 2.2],
  },
  raceway: {
    id: "raceway",
    name: "Leeward Raceway",
    group: "Avionics",
    vehicle: "ship",
    summary:
      "External cable and plumbing tray running the leeward length of the vehicle. The un-tiled stainless side.",
    specs: [
      { label: "Side", value: "Leeward" },
      { label: "Length", value: "~36 m" },
    ],
    explode: [0, 0, 11],
    anchor: [0, 22, 4.7],
  },
  raptorSL1: {
    id: "raptorSL1",
    name: "Raptor SL-1",
    group: "Engines",
    vehicle: "ship",
    summary: "Center-cluster sea-level Raptor. Regeneratively cooled short bell, 250 tf class (Raptor 3).",
    specs: [
      { label: "Variant", value: "Sea-level" },
      { label: "Thrust", value: "250 tf" },
      { label: "Isp", value: "327 s" },
    ],
    explode: [0, -14, 4],
    anchor: [0, -1.2, 1.55],
  },
  raptorSL2: {
    id: "raptorSL2",
    name: "Raptor SL-2",
    group: "Engines",
    vehicle: "ship",
    summary: "Sea-level Raptor, 120° in the inner triangle.",
    specs: [
      { label: "Variant", value: "Sea-level" },
      { label: "Thrust", value: "250 tf" },
    ],
    explode: [-6, -14, -3],
    anchor: [-1.34, -1.2, -0.78],
  },
  raptorSL3: {
    id: "raptorSL3",
    name: "Raptor SL-3",
    group: "Engines",
    vehicle: "ship",
    summary: "Sea-level Raptor, 240° in the inner triangle.",
    specs: [
      { label: "Variant", value: "Sea-level" },
      { label: "Thrust", value: "250 tf" },
    ],
    explode: [6, -14, -3],
    anchor: [1.34, -1.2, -0.78],
  },
  raptorVac1: {
    id: "raptorVac1",
    name: "Raptor Vac-1",
    group: "Engines",
    vehicle: "ship",
    summary: "Vacuum Raptor with an extended nozzle. Outer cluster, 275 tf class.",
    specs: [
      { label: "Variant", value: "Vacuum" },
      { label: "Thrust", value: "275 tf" },
      { label: "Isp", value: "380 s" },
    ],
    explode: [0, -16, -8],
    anchor: [0, -1.6, -2.85],
  },
  raptorVac2: {
    id: "raptorVac2",
    name: "Raptor Vac-2",
    group: "Engines",
    vehicle: "ship",
    summary: "Vacuum Raptor, 120° outer triangle.",
    specs: [
      { label: "Variant", value: "Vacuum" },
      { label: "Thrust", value: "275 tf" },
    ],
    explode: [-10, -16, 4],
    anchor: [-2.47, -1.6, 1.43],
  },
  raptorVac3: {
    id: "raptorVac3",
    name: "Raptor Vac-3",
    group: "Engines",
    vehicle: "ship",
    summary: "Vacuum Raptor, 240° outer triangle.",
    specs: [
      { label: "Variant", value: "Vacuum" },
      { label: "Thrust", value: "275 tf" },
    ],
    explode: [10, -16, 4],
    anchor: [2.47, -1.6, 1.43],
  },
  boosterBarrel: {
    id: "boosterBarrel",
    name: "Super Heavy Barrel",
    group: "Booster",
    vehicle: "booster",
    summary:
      "72 m stainless booster. 33 Raptors, 3,650 t propellant, grid-fin recovery. Hot-staging ring at the top.",
    specs: [
      { label: "Height", value: "72 m" },
      { label: "Engines", value: "33 × Raptor" },
      { label: "Thrust", value: "~82 MN" },
    ],
    explode: [0, -18, 0],
    anchor: [0, 35, 0],
  },
  hotStage: {
    id: "hotStage",
    name: "Hot-Stage Ring",
    group: "Booster",
    vehicle: "booster",
    summary:
      "Vented interstage that lets Ship engines ignite while still stacked. Exhaust dumps through the ring ports.",
    specs: [
      { label: "Height", value: "4.0 m" },
      { label: "Mode", value: "Hot staging" },
    ],
    explode: [0, -6, 0],
    anchor: [0, 69, 0],
  },
  gridFins: {
    id: "gridFins",
    name: "Grid Fins (×4)",
    group: "Booster",
    vehicle: "booster",
    summary: "Four large steel grid fins near the booster forward barrel. Steer Super Heavy on reentry and landing.",
    specs: [
      { label: "Count", value: "4" },
      { label: "Material", value: "Stainless" },
    ],
    explode: [0, -4, 0],
    anchor: [6, 62, 0],
  },
  boosterEngines: {
    id: "boosterEngines",
    name: "Raptor Cluster — 33",
    group: "Booster",
    vehicle: "booster",
    summary: "3 inner + 10 + 20 outer sea-level Raptors. Center engines gimbal for landing; outer ring is mostly fixed.",
    specs: [
      { label: "Count", value: "33" },
      { label: "Layout", value: "3 / 10 / 20" },
    ],
    explode: [0, -20, 0],
    anchor: [0, -1.4, 0],
  },
};

export const CATALOG_LIST = Object.values(CATALOG);

export const GROUPS = ["Forward", "Aero", "Propellant", "Thermal", "Propulsion", "Engines", "Avionics", "Booster"] as const;
