import { i as __toESM } from "../_runtime.mjs";
import { B as Object3D, G as RepeatWrapping, K as SRGBColorSpace, N as MathUtils, R as MeshStandardMaterial, T as ExtrudeGeometry, U as Plane, Y as Shape, a as Outlines, at as require_jsx_runtime, b as CanvasTexture, c as Html, et as Vector2, f as useFrame, h as PMREMGenerator, i as OrbitControls, k as LatheGeometry, n as Sky, o as Line, ot as require_react, p as useThree, r as Grid, s as useCursor, t as Stars, tt as Vector3, u as Canvas, v as BufferAttribute, y as BufferGeometry } from "../_libs/@react-three/drei+[...].mjs";
import { a as Ruler, c as Layers, d as CircleDashed, f as Camera, i as Scissors, l as Grid3x3, m as Axis3d, o as RotateCcw, p as Box, r as Spline, s as Rocket, t as UnfoldVertical, u as Clapperboard } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { i as Vignette, n as DepthOfField, r as EffectComposer, t as Bloom } from "../_libs/@react-three/postprocessing+[...].mjs";
import { t as RoomEnvironment } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C08uOaZ6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function smoothstep(t) {
	const x = Math.min(1, Math.max(0, t));
	return x * x * (3 - 2 * x);
}
var CATALOG = {
	noseCone: {
		id: "noseCone",
		name: "Nose Cone",
		group: "Forward",
		vehicle: "ship",
		summary: "Ogive nose of 304L stainless. Houses the payload volume extension, LOX header tank, and forward RCS. Windward face carries hexagonal TPS tiles.",
		specs: [
			{
				label: "Material",
				value: "304L stainless"
			},
			{
				label: "Height",
				value: "13.2 m"
			},
			{
				label: "Base Ø",
				value: "9.0 m"
			}
		],
		explode: [
			0,
			16,
			0
		],
		anchor: [
			0,
			46,
			0
		]
	},
	payloadBay: {
		id: "payloadBay",
		name: "Payload Bay",
		group: "Forward",
		vehicle: "ship",
		summary: "Block 2 short bay (3 rings). Cargo / Pez dispenser volume, partially carried into the nose cone to maximize propellant.",
		specs: [
			{
				label: "Height",
				value: "5.5 m"
			},
			{
				label: "Volume class",
				value: "Cargo / Pez"
			},
			{
				label: "Rings",
				value: "3"
			}
		],
		explode: [
			0,
			9,
			0
		],
		anchor: [
			0,
			36.2,
			0
		]
	},
	pezDoor: {
		id: "pezDoor",
		name: "Pez Dispenser Door",
		group: "Forward",
		vehicle: "ship",
		summary: "Side-opening payload door used to deploy Starlink stacks. Hinged panel on the payload barrel.",
		specs: [{
			label: "Type",
			value: "Pez / cargo door"
		}, {
			label: "Location",
			value: "Starboard bay"
		}],
		explode: [
			10,
			8,
			0
		],
		anchor: [
			4.6,
			36.2,
			0
		]
	},
	fwdFlapPort: {
		id: "fwdFlapPort",
		name: "Forward Flap — Port",
		group: "Aero",
		vehicle: "ship",
		summary: "Block 2 canard. Thinner, more leeward, and swept versus Block 1. Controls pitch/roll during entry and landing flip.",
		specs: [
			{
				label: "Span",
				value: "5.2 m"
			},
			{
				label: "Actuation",
				value: "Electric"
			},
			{
				label: "Side",
				value: "Port"
			}
		],
		explode: [
			-13,
			6,
			5
		],
		anchor: [
			-6.5,
			41,
			2.2
		]
	},
	fwdFlapStbd: {
		id: "fwdFlapStbd",
		name: "Forward Flap — Starboard",
		group: "Aero",
		vehicle: "ship",
		summary: "Block 2 canard, starboard. Relocated leeward after Block 1 heating issues on the windward hinge line.",
		specs: [
			{
				label: "Span",
				value: "5.2 m"
			},
			{
				label: "Actuation",
				value: "Electric"
			},
			{
				label: "Side",
				value: "Starboard"
			}
		],
		explode: [
			13,
			6,
			5
		],
		anchor: [
			6.5,
			41,
			2.2
		]
	},
	ch4Tank: {
		id: "ch4Tank",
		name: "Main CH4 Tank",
		group: "Propellant",
		vehicle: "ship",
		summary: "Forward main methane tank. Shares a common dome with the LOX tank. Feeds Raptor via downcomers.",
		specs: [
			{
				label: "Propellant",
				value: "LCH4"
			},
			{
				label: "Height",
				value: "13.8 m"
			},
			{
				label: "Wall",
				value: "304L, 3–4 mm"
			}
		],
		explode: [
			0,
			3.5,
			0
		],
		anchor: [
			0,
			26.5,
			0
		]
	},
	commonDome: {
		id: "commonDome",
		name: "Common Dome",
		group: "Propellant",
		vehicle: "ship",
		summary: "Shared bulkhead between LOX (aft) and CH4 (forward). Carries the CH4 header tank on the methane side.",
		specs: [{
			label: "Type",
			value: "Ellipsoidal bulkhead"
		}, {
			label: "Interface",
			value: "LOX / CH4"
		}],
		explode: [
			11,
			0,
			0
		],
		anchor: [
			0,
			19.6,
			0
		]
	},
	loxTank: {
		id: "loxTank",
		name: "Main LOX Tank",
		group: "Propellant",
		vehicle: "ship",
		summary: "Aft liquid oxygen tank. Largest single volume on the ship. Supplies the engine bay through the thrust puck.",
		specs: [
			{
				label: "Propellant",
				value: "LOX"
			},
			{
				label: "Height",
				value: "13.4 m"
			},
			{
				label: "Temp",
				value: "90 K"
			}
		],
		explode: [
			0,
			-3,
			0
		],
		anchor: [
			0,
			13,
			0
		]
	},
	headerLox: {
		id: "headerLox",
		name: "LOX Header Tank",
		group: "Propellant",
		vehicle: "ship",
		summary: "Nose-mounted header tank that keeps LOX at the engines during the landing flip, when main-tank residuals slosh forward.",
		specs: [{
			label: "Location",
			value: "Nose"
		}, {
			label: "Role",
			value: "Landing burn"
		}],
		explode: [
			0,
			18,
			8
		],
		anchor: [
			0,
			49.5,
			0
		]
	},
	headerCh4: {
		id: "headerCh4",
		name: "CH4 Header Tank",
		group: "Propellant",
		vehicle: "ship",
		summary: "Methane header near the common dome. Dedicated landing-burn reservoir independent of main-tank orientation.",
		specs: [{
			label: "Location",
			value: "Common dome"
		}, {
			label: "Role",
			value: "Landing burn"
		}],
		explode: [
			-10,
			1,
			0
		],
		anchor: [
			0,
			21.2,
			0
		]
	},
	aftFlapPort: {
		id: "aftFlapPort",
		name: "Aft Flap — Port",
		group: "Aero",
		vehicle: "ship",
		summary: "Large aft control surface. Provides pitch authority in the belly-flop and acts as a body flap on landing. Windward face is tiled.",
		specs: [
			{
				label: "Span",
				value: "7.8 m"
			},
			{
				label: "Actuators",
				value: "1 × 3-motor"
			},
			{
				label: "Side",
				value: "Port"
			}
		],
		explode: [
			-16,
			-2,
			0
		],
		anchor: [
			-7.5,
			10,
			0
		]
	},
	aftFlapStbd: {
		id: "aftFlapStbd",
		name: "Aft Flap — Starboard",
		group: "Aero",
		vehicle: "ship",
		summary: "Starboard aft flap. Single actuator with three motors on Block 2/3 vehicles.",
		specs: [
			{
				label: "Span",
				value: "7.8 m"
			},
			{
				label: "Actuators",
				value: "1 × 3-motor"
			},
			{
				label: "Side",
				value: "Starboard"
			}
		],
		explode: [
			16,
			-2,
			0
		],
		anchor: [
			7.5,
			10,
			0
		]
	},
	heatShield: {
		id: "heatShield",
		name: "TPS Heat Shield",
		group: "Thermal",
		vehicle: "ship",
		summary: "Hexagonal silica tiles on the windward side, ~18,000 on a full ship. Pins, crunch-wrap gap filler, and an ablative underlayer on later Blocks.",
		specs: [
			{
				label: "Tiles",
				value: "~18,000"
			},
			{
				label: "Temp",
				value: "1,400 °C"
			},
			{
				label: "Mass (B1)",
				value: "10.5 t"
			}
		],
		explode: [
			0,
			0,
			-12
		],
		anchor: [
			0,
			22,
			-4.6
		]
	},
	engineBay: {
		id: "engineBay",
		name: "Aft Skirt / Engine Bay",
		group: "Propulsion",
		vehicle: "ship",
		summary: "Aft skirt, thrust puck, COPVs, and engine mounts. Six Raptors gimbal through the puck. Sooted from static fires and flight.",
		specs: [{
			label: "Height",
			value: "6.2 m"
		}, {
			label: "Engines",
			value: "6 × Raptor"
		}],
		explode: [
			0,
			-8,
			0
		],
		anchor: [
			0,
			3.1,
			0
		]
	},
	thrustPuck: {
		id: "thrustPuck",
		name: "Thrust Puck",
		group: "Propulsion",
		vehicle: "ship",
		summary: "Hardened thrust structure transferring Raptor loads into the LOX tank barrel and common dome load path.",
		specs: [{
			label: "Type",
			value: "Thrust structure"
		}, {
			label: "Load path",
			value: "6 × Raptor"
		}],
		explode: [
			0,
			-10,
			0
		],
		anchor: [
			0,
			6,
			0
		]
	},
	downcomer: {
		id: "downcomer",
		name: "Downcomer Assembly",
		group: "Propulsion",
		vehicle: "ship",
		summary: "Block 2 uses a shared downcomer for the three center SL Raptors and separate vacuum-engine downcomers.",
		specs: [{
			label: "SL",
			value: "Shared"
		}, {
			label: "Vac",
			value: "Independent"
		}],
		explode: [
			8,
			-4,
			0
		],
		anchor: [
			1.2,
			12,
			0
		]
	},
	copv: {
		id: "copv",
		name: "COPV Bank",
		group: "Propulsion",
		vehicle: "ship",
		summary: "Composite overwrapped pressure vessels in the engine bay for helium / autogenous pressurant.",
		specs: [{
			label: "Type",
			value: "COPV"
		}, {
			label: "Location",
			value: "Engine bay"
		}],
		explode: [
			9,
			-7,
			4
		],
		anchor: [
			2.6,
			2.4,
			2.2
		]
	},
	raceway: {
		id: "raceway",
		name: "Leeward Raceway",
		group: "Avionics",
		vehicle: "ship",
		summary: "External cable and plumbing tray running the leeward length of the vehicle. The un-tiled stainless side.",
		specs: [{
			label: "Side",
			value: "Leeward"
		}, {
			label: "Length",
			value: "~36 m"
		}],
		explode: [
			0,
			0,
			11
		],
		anchor: [
			0,
			22,
			4.7
		]
	},
	raptorSL1: {
		id: "raptorSL1",
		name: "Raptor SL-1",
		group: "Engines",
		vehicle: "ship",
		summary: "Center-cluster sea-level Raptor. Regeneratively cooled short bell, 250 tf class (Raptor 3).",
		specs: [
			{
				label: "Variant",
				value: "Sea-level"
			},
			{
				label: "Thrust",
				value: "250 tf"
			},
			{
				label: "Isp",
				value: "327 s"
			}
		],
		explode: [
			0,
			-14,
			4
		],
		anchor: [
			0,
			-1.2,
			1.55
		]
	},
	raptorSL2: {
		id: "raptorSL2",
		name: "Raptor SL-2",
		group: "Engines",
		vehicle: "ship",
		summary: "Sea-level Raptor, 120° in the inner triangle.",
		specs: [{
			label: "Variant",
			value: "Sea-level"
		}, {
			label: "Thrust",
			value: "250 tf"
		}],
		explode: [
			-6,
			-14,
			-3
		],
		anchor: [
			-1.34,
			-1.2,
			-.78
		]
	},
	raptorSL3: {
		id: "raptorSL3",
		name: "Raptor SL-3",
		group: "Engines",
		vehicle: "ship",
		summary: "Sea-level Raptor, 240° in the inner triangle.",
		specs: [{
			label: "Variant",
			value: "Sea-level"
		}, {
			label: "Thrust",
			value: "250 tf"
		}],
		explode: [
			6,
			-14,
			-3
		],
		anchor: [
			1.34,
			-1.2,
			-.78
		]
	},
	raptorVac1: {
		id: "raptorVac1",
		name: "Raptor Vac-1",
		group: "Engines",
		vehicle: "ship",
		summary: "Vacuum Raptor with an extended nozzle. Outer cluster, 275 tf class.",
		specs: [
			{
				label: "Variant",
				value: "Vacuum"
			},
			{
				label: "Thrust",
				value: "275 tf"
			},
			{
				label: "Isp",
				value: "380 s"
			}
		],
		explode: [
			0,
			-16,
			-8
		],
		anchor: [
			0,
			-1.6,
			-2.85
		]
	},
	raptorVac2: {
		id: "raptorVac2",
		name: "Raptor Vac-2",
		group: "Engines",
		vehicle: "ship",
		summary: "Vacuum Raptor, 120° outer triangle.",
		specs: [{
			label: "Variant",
			value: "Vacuum"
		}, {
			label: "Thrust",
			value: "275 tf"
		}],
		explode: [
			-10,
			-16,
			4
		],
		anchor: [
			-2.47,
			-1.6,
			1.43
		]
	},
	raptorVac3: {
		id: "raptorVac3",
		name: "Raptor Vac-3",
		group: "Engines",
		vehicle: "ship",
		summary: "Vacuum Raptor, 240° outer triangle.",
		specs: [{
			label: "Variant",
			value: "Vacuum"
		}, {
			label: "Thrust",
			value: "275 tf"
		}],
		explode: [
			10,
			-16,
			4
		],
		anchor: [
			2.47,
			-1.6,
			1.43
		]
	},
	boosterBarrel: {
		id: "boosterBarrel",
		name: "Super Heavy Barrel",
		group: "Booster",
		vehicle: "booster",
		summary: "71 m stainless booster. 33 Raptors, 3,400 t propellant, grid-fin recovery. Hot-staging ring at the top.",
		specs: [
			{
				label: "Height",
				value: "71 m"
			},
			{
				label: "Engines",
				value: "33 × Raptor"
			},
			{
				label: "Thrust",
				value: "89.5 MN"
			}
		],
		explode: [
			0,
			-18,
			0
		],
		anchor: [
			0,
			35,
			0
		]
	},
	hotStage: {
		id: "hotStage",
		name: "Hot-Stage Ring",
		group: "Booster",
		vehicle: "booster",
		summary: "Vented interstage that lets Ship engines ignite while still stacked. Exhaust dumps through the ring ports.",
		specs: [{
			label: "Height",
			value: "3.6 m"
		}, {
			label: "Mode",
			value: "Hot staging"
		}],
		explode: [
			0,
			-6,
			0
		],
		anchor: [
			0,
			69,
			0
		]
	},
	gridFins: {
		id: "gridFins",
		name: "Grid Fins (×4)",
		group: "Booster",
		vehicle: "booster",
		summary: "Four large steel grid fins near the booster forward barrel. Steer Super Heavy on reentry and landing.",
		specs: [{
			label: "Count",
			value: "4"
		}, {
			label: "Material",
			value: "Stainless"
		}],
		explode: [
			0,
			-4,
			0
		],
		anchor: [
			6,
			62,
			0
		]
	},
	boosterEngines: {
		id: "boosterEngines",
		name: "Raptor Cluster — 33",
		group: "Booster",
		vehicle: "booster",
		summary: "3 inner + 10 + 20 outer sea-level Raptors. Center engines gimbal for landing; outer ring is mostly fixed.",
		specs: [{
			label: "Count",
			value: "33"
		}, {
			label: "Layout",
			value: "3 / 10 / 20"
		}],
		explode: [
			0,
			-20,
			0
		],
		anchor: [
			0,
			-1.4,
			0
		]
	}
};
var CATALOG_LIST = Object.values(CATALOG);
var GROUPS = [
	"Forward",
	"Aero",
	"Propellant",
	"Thermal",
	"Propulsion",
	"Engines",
	"Avionics",
	"Booster"
];
var scenarioBooster = {
	launchpad: true,
	hangar: false,
	space: false,
	orbit: false
};
var useViewer = create((set, get) => ({
	viewMode: "solid",
	scenario: "hangar",
	appMode: "inspect",
	cameraView: "iso",
	cameraTick: 0,
	focusId: null,
	explodeTarget: 0,
	exploded: 0,
	sectionEnabled: false,
	sectionAxis: "x",
	sectionPos: .52,
	showGrid: true,
	showAxes: false,
	measureMode: false,
	measureA: null,
	measureB: null,
	selectedId: null,
	hoveredId: null,
	showBooster: false,
	launchPhase: "idle",
	launchTime: -10,
	altitude: 0,
	velocity: 0,
	cinematicT: 0,
	setViewMode: (viewMode) => set({ viewMode }),
	setScenario: (scenario) => set({
		scenario,
		showBooster: scenarioBooster[scenario],
		appMode: "inspect",
		launchPhase: "idle",
		altitude: 0,
		velocity: 0,
		launchTime: -10,
		cameraTick: get().cameraTick + 1
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
				cameraTick: get().cameraTick + 1
			});
			return;
		}
		if (appMode === "inspect") {
			set({
				appMode,
				launchPhase: "idle",
				altitude: 0,
				velocity: 0,
				launchTime: -10
			});
			return;
		}
		set({
			appMode,
			cinematicT: 0
		});
	},
	setCameraView: (cameraView) => set({
		cameraView,
		cameraTick: get().cameraTick + 1,
		focusId: null,
		appMode: "inspect"
	}),
	setFocus: (focusId) => set({
		focusId,
		cameraTick: get().cameraTick + 1,
		appMode: "inspect",
		selectedId: focusId
	}),
	toggleExplode: () => set({ explodeTarget: get().explodeTarget > .5 ? 0 : 1 }),
	setExploded: (exploded) => set({ exploded }),
	setSectionEnabled: (sectionEnabled) => set({ sectionEnabled }),
	setSectionAxis: (sectionAxis) => set({ sectionAxis }),
	setSectionPos: (sectionPos) => set({ sectionPos }),
	toggleGrid: () => set({ showGrid: !get().showGrid }),
	toggleAxes: () => set({ showAxes: !get().showAxes }),
	toggleMeasure: () => set({
		measureMode: !get().measureMode,
		measureA: null,
		measureB: null
	}),
	setMeasurePoint: (p) => {
		const { measureA, measureB } = get();
		if (!measureA || measureA && measureB) set({
			measureA: p,
			measureB: null
		});
		else set({ measureB: p });
	},
	clearMeasure: () => set({
		measureA: null,
		measureB: null,
		measureMode: false
	}),
	select: (selectedId) => {
		if (selectedId && !CATALOG[selectedId]) return;
		set({ selectedId });
	},
	setHovered: (hoveredId) => set({ hoveredId }),
	toggleBooster: () => set({
		showBooster: !get().showBooster,
		cameraTick: get().cameraTick + 1
	}),
	startLaunch: () => get().setAppMode("launch"),
	resetVehicle: () => set({
		appMode: "inspect",
		launchPhase: "idle",
		launchTime: -10,
		altitude: 0,
		velocity: 0,
		explodeTarget: 0,
		cinematicT: 0,
		cameraTick: get().cameraTick + 1
	}),
	tickSim: (dt) => {
		const s = get();
		const exploded = s.exploded + (s.explodeTarget - s.exploded) * (1 - Math.exp(-5.2 * dt));
		const patch = {};
		if (Math.abs(exploded - s.exploded) > 15e-5) patch.exploded = exploded;
		if (s.appMode === "cinematic") patch.cinematicT = s.cinematicT + dt;
		if (s.appMode === "launch") {
			let { launchPhase, launchTime, altitude, velocity } = s;
			launchTime += dt;
			if (launchPhase === "countdown" && launchTime >= -3.15) launchPhase = "ignition";
			if ((launchPhase === "countdown" || launchPhase === "ignition") && launchTime >= 0) launchPhase = "liftoff";
			if (launchPhase === "liftoff" || launchPhase === "ascent") {
				velocity += (launchPhase === "liftoff" ? 9.5 : 16.5) * dt;
				altitude += velocity * dt;
				if (altitude > 14) launchPhase = "ascent";
				if (altitude > 520) launchPhase = "complete";
			}
			patch.launchPhase = launchPhase;
			patch.launchTime = launchTime;
			patch.altitude = altitude;
			patch.velocity = velocity;
		}
		if (Object.keys(patch).length) set(patch);
	}
}));
function Tool({ active, onClick, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		title: label,
		onClick,
		className: cn("flex h-11 min-w-11 items-center justify-center gap-2 rounded-md px-3 font-sans text-xs font-medium tracking-wide transition-colors duration-150", active ? "bg-accent text-bg" : "bg-surface-2 text-muted hover:text-fg"),
		children
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-8 rounded-sm px-2.5 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors duration-150", active ? "bg-accent text-bg" : "text-muted hover:text-fg"),
		children
	});
}
var VIEWS = [
	{
		id: "solid",
		label: "Solid",
		icon: Box
	},
	{
		id: "wireframe",
		label: "Wireframe",
		icon: Spline
	},
	{
		id: "xray",
		label: "X-Ray",
		icon: CircleDashed
	},
	{
		id: "transparent",
		label: "Transparent",
		icon: Layers
	}
];
var SCENARIOS = [
	{
		id: "hangar",
		label: "Hangar"
	},
	{
		id: "launchpad",
		label: "Launch Site"
	},
	{
		id: "space",
		label: "Space"
	},
	{
		id: "orbit",
		label: "Earth Orbit"
	}
];
var CAMS = [
	{
		id: "iso",
		label: "ISO"
	},
	{
		id: "front",
		label: "Front"
	},
	{
		id: "side",
		label: "Side"
	},
	{
		id: "top",
		label: "Top"
	},
	{
		id: "aft",
		label: "Aft"
	},
	{
		id: "engines",
		label: "Engines"
	},
	{
		id: "nose",
		label: "Nose"
	}
];
var MODES = [
	{
		id: "inspect",
		label: "Inspect",
		icon: Box
	},
	{
		id: "launch",
		label: "Launch",
		icon: Rocket
	},
	{
		id: "cinematic",
		label: "Cinema",
		icon: Clapperboard
	}
];
function formatT(t) {
	const sign = t < 0 ? "-" : "+";
	const a = Math.abs(t);
	const m = Math.floor(a / 60);
	const s = a % 60;
	return `${sign}${String(m).padStart(2, "0")}:${s.toFixed(1).padStart(4, "0")}`;
}
function HUD() {
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
	const grouped = (0, import_react.useMemo)(() => {
		return GROUPS.map((g) => ({
			g,
			items: CATALOG_LIST.filter((c) => c.group === g).filter((c) => showBooster || c.vehicle === "ship")
		})).filter((x) => x.items.length);
	}, [showBooster]);
	const launching = appMode === "launch";
	const showCount = launching && (launchPhase === "countdown" || launchPhase === "ignition" || launchPhase === "liftoff");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-10 text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "pointer-events-auto absolute top-0 right-0 left-0 flex items-center justify-between gap-3 border-b border-border bg-bg/80 px-4 py-3 backdrop-blur-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.28em] text-muted uppercase",
							children: "Vehicle S37 · Block 2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate font-sans text-lg font-medium tracking-tight text-balance",
							children: "STARSHIP"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden items-center gap-1 md:flex",
						children: MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tool, {
							label: m.label,
							active: appMode === m.id,
							onClick: () => useViewer.getState().setAppMode(m.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, {
								className: "size-4",
								strokeWidth: 1.75
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden lg:inline",
								children: m.label
							})]
						}, m.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 font-mono text-[11px] tracking-wider text-muted tabular-nums",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: launching ? "text-go" : "",
							children: formatT(launching ? launchTime : 0)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-subtle",
							children: "UTC"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "pointer-events-auto absolute top-20 left-3 hidden w-56 flex-col gap-2 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-surface/80 p-2 backdrop-blur-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 px-1 font-mono text-[10px] tracking-[0.2em] text-subtle uppercase",
							children: "Display"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-1",
							children: VIEWS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tool, {
								label: v.label,
								active: viewMode === v.id,
								onClick: () => useViewer.getState().setViewMode(v.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(v.icon, {
									className: "size-3.5",
									strokeWidth: 1.75
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: v.label })]
							}, v.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-surface/80 p-2 backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 px-1 font-mono text-[10px] tracking-[0.2em] text-subtle uppercase",
								children: "CAD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
										label: "Exploded view",
										active: explodeTarget > .5,
										onClick: () => useViewer.getState().toggleExplode(),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnfoldVertical, {
											className: "size-3.5",
											strokeWidth: 1.75
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
										label: "Section cut",
										active: sectionEnabled,
										onClick: () => useViewer.getState().setSectionEnabled(!sectionEnabled),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, {
											className: "size-3.5",
											strokeWidth: 1.75
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
										label: "Grid",
										active: showGrid,
										onClick: () => useViewer.getState().toggleGrid(),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid3x3, {
											className: "size-3.5",
											strokeWidth: 1.75
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
										label: "Axes",
										active: showAxes,
										onClick: () => useViewer.getState().toggleAxes(),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Axis3d, {
											className: "size-3.5",
											strokeWidth: 1.75
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
										label: "Measure",
										active: measureMode,
										onClick: () => useViewer.getState().toggleMeasure(),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, {
											className: "size-3.5",
											strokeWidth: 1.75
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
										label: "Reset",
										onClick: () => useViewer.getState().resetVehicle(),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
											className: "size-3.5",
											strokeWidth: 1.75
										})
									})
								]
							}),
							sectionEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 space-y-2 px-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1",
									children: [
										"x",
										"y",
										"z"
									].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										active: sectionAxis === a,
										onClick: () => useViewer.getState().setSectionAxis(a),
										children: a
									}, a))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 0,
									max: 1,
									step: .004,
									value: sectionPos,
									onChange: (e) => useViewer.getState().setSectionPos(Number(e.target.value)),
									className: "h-1 w-full accent-accent"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-surface/80 p-2 backdrop-blur-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 px-1 font-mono text-[10px] tracking-[0.2em] text-subtle uppercase",
							children: "Camera"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: CAMS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: cameraView === c.id && appMode === "inspect",
								onClick: () => useViewer.getState().setCameraView(c.id),
								children: c.label
							}, c.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "pointer-events-auto absolute top-20 right-3 hidden w-64 flex-col gap-2 lg:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface/80 p-3 backdrop-blur-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 font-mono text-[10px] tracking-[0.2em] text-subtle uppercase",
							children: "Scenario"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: SCENARIOS.map((sc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: scenario === sc.id,
								onClick: () => useViewer.getState().setScenario(sc.id),
								children: sc.label
							}, sc.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => useViewer.getState().toggleBooster(),
							className: "mt-2 h-8 w-full rounded-sm bg-surface-2 font-mono text-[10px] tracking-[0.16em] text-muted uppercase hover:text-fg",
							children: showBooster ? "Stack · Super Heavy" : "Ship only"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[42vh] overflow-auto rounded-lg border border-border bg-surface/80 p-3 backdrop-blur-sm",
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.2em] text-subtle uppercase",
							children: selected.group
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-sans text-base font-medium tracking-tight",
							children: selected.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-pretty text-xs leading-relaxed text-muted",
							children: selected.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-3 space-y-1",
							children: selected.specs.map((sp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3 font-mono text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: sp.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-fg tabular-nums",
									children: sp.value
								})]
							}, sp.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => useViewer.getState().setFocus(selected.id),
							className: "mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-md bg-accent text-xs font-medium text-bg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {
								className: "size-3.5",
								strokeWidth: 1.75
							}), "Focus"]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.2em] text-subtle uppercase",
							children: "Components"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: "Select a part on the vehicle or from the list."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-3",
							children: grouped.map(({ g, items }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-1 font-mono text-[10px] tracking-[0.16em] text-subtle uppercase",
								children: g
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-0.5",
								children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => useViewer.getState().select(c.id),
									className: "w-full rounded-sm px-1 py-1.5 text-left text-xs text-muted hover:bg-surface-2 hover:text-fg",
									children: c.name
								}) }, c.id))
							})] }, g))
						})
					] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "pointer-events-auto absolute right-0 bottom-0 left-0 flex flex-col gap-2 border-t border-border bg-bg/80 px-3 py-2 backdrop-blur-sm md:flex-row md:flex-wrap md:items-center md:justify-between md:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1 md:hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1 overflow-x-auto",
								children: [
									MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
										label: m.label,
										active: appMode === m.id,
										onClick: () => useViewer.getState().setAppMode(m.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, {
											className: "size-4",
											strokeWidth: 1.75
										})
									}, m.id)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
										label: "Explode",
										active: explodeTarget > .5,
										onClick: () => useViewer.getState().toggleExplode(),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnfoldVertical, {
											className: "size-4",
											strokeWidth: 1.75
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tool, {
										label: "Section",
										active: sectionEnabled,
										onClick: () => useViewer.getState().setSectionEnabled(!sectionEnabled),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, {
											className: "size-4",
											strokeWidth: 1.75
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1 overflow-x-auto",
								children: VIEWS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									active: viewMode === v.id,
									onClick: () => useViewer.getState().setViewMode(v.id),
									children: v.label
								}, v.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1 overflow-x-auto",
								children: SCENARIOS.map((sc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									active: scenario === sc.id,
									onClick: () => useViewer.getState().setScenario(sc.id),
									children: sc.label
								}, sc.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] tracking-wide tabular-nums",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "ALT"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [altitude.toFixed(1), " m"] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "VEL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [velocity.toFixed(1), " m/s"] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "Ø"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "9.00 m" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "H"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: showBooster ? "123.1 m" : "52.1 m" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "MODE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "uppercase",
									children: viewMode
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden font-mono text-[10px] tracking-[0.16em] text-subtle uppercase sm:block",
						children: "Drag orbit · Scroll zoom · Click select"
					})
				]
			}),
			showCount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] tracking-[0.4em] text-muted uppercase",
					children: launchPhase === "countdown" ? "Terminal count" : launchPhase === "ignition" ? "Engine start" : "Liftoff"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-6xl font-medium tracking-tight text-fg tabular-nums md:text-7xl",
					children: launchTime < 0 ? `T${formatT(launchTime)}` : "LIFTOFF"
				})]
			})
		]
	});
}
var R = 4.5;
var SHIP = {
	radius: R,
	height: 52.1,
	skirtH: 6.2,
	loxH: 13.4,
	ch4H: 13.8,
	payloadH: 5.5,
	noseH: 13.2,
	ringH: 1.83,
	bellSl: 2.55,
	bellVac: 3.35
};
var Y = {
	skirt0: 0,
	skirt1: 6.2,
	lox1: 19.6,
	ch41: 33.4,
	pay1: 38.9,
	nose1: 52.1
};
var BOOSTER = {
	radius: R,
	height: 71,
	skirtH: 8.4,
	hotStageH: 3.6,
	bell: 2.9
};
var STEEL = "#c5c9ce";
var STEEL_DARK = "#9aa1a8";
var STEEL_SOOT = "#6e7378";
var TILE = "#1a1b1e";
var NOZZLE = "#6a5a4c";
var NOZZLE_VAC = "#7a6856";
var PUMP = "#8b929a";
var GLASS = "#9eb4c8";
var CRYO_LOX = "#c5d4e4";
var CRYO_CH4 = "#d7cfc4";
var STRUCTURE = "#3a3e44";
var TITANIUM = "#b7b3aa";
function createNoseGeometry() {
	const pts = [];
	const H = SHIP.noseH;
	for (let i = 0; i <= 48; i++) {
		const t = i / 48;
		const y = H * (1 - t);
		const x = R * Math.pow(Math.sin(t * Math.PI / 2), .78);
		pts.push(new Vector2(Math.max(.07, x), y));
	}
	return new LatheGeometry(pts, 64);
}
function createBellGeometry(exitR, length, throat = .17) {
	const pts = [];
	for (let i = 0; i <= 28; i++) {
		const t = i / 28;
		const r = throat + (exitR - throat) * Math.pow(t, .67);
		pts.push(new Vector2(r, -t * length));
	}
	return new LatheGeometry(pts, 28);
}
function createFlapGeometry(span, root, tip, thick) {
	const s = new Shape();
	s.moveTo(0, -root / 2);
	s.lineTo(span * .15, -root / 2 + .05);
	s.lineTo(span, -tip / 2);
	s.lineTo(span, tip / 2);
	s.lineTo(span * .15, root / 2 - .05);
	s.lineTo(0, root / 2);
	s.closePath();
	const g = new ExtrudeGeometry(s, {
		depth: thick,
		bevelEnabled: true,
		bevelThickness: thick * .18,
		bevelSize: thick * .14,
		bevelSegments: 2
	});
	g.translate(0, 0, -thick / 2);
	g.computeVertexNormals();
	return g;
}
function ringPositions(count, radius, phase = 0) {
	return Array.from({ length: count }, (_, i) => {
		const a = phase + i / count * Math.PI * 2;
		return [Math.sin(a) * radius, Math.cos(a) * radius];
	});
}
var SHIP_SL = ringPositions(3, 1.55, 0);
var SHIP_VAC = ringPositions(3, 2.82, Math.PI / 3);
var BOOSTER_ENGINES = [
	...ringPositions(3, .92, 0),
	...ringPositions(10, 2.42, .12),
	...ringPositions(20, 3.82, 0)
];
function makeBrushedTexture() {
	const c = document.createElement("canvas");
	c.width = 256;
	c.height = 256;
	const ctx = c.getContext("2d");
	ctx.fillStyle = "#c8ccd1";
	ctx.fillRect(0, 0, 256, 256);
	for (let x = 0; x < 256; x++) {
		ctx.fillStyle = `rgba(255,255,255,${Math.random() * .08})`;
		ctx.fillRect(x, 0, 1, 256);
		ctx.fillStyle = `rgba(20,22,24,${Math.random() * .07})`;
		ctx.fillRect(x, 0, 1, 256);
	}
	const t = new CanvasTexture(c);
	t.wrapS = t.wrapT = RepeatWrapping;
	t.repeat.set(2, 10);
	t.anisotropy = 8;
	t.colorSpace = SRGBColorSpace;
	return t;
}
function makeConcreteTexture() {
	const c = document.createElement("canvas");
	c.width = 512;
	c.height = 512;
	const ctx = c.getContext("2d");
	ctx.fillStyle = "#6a6c6f";
	ctx.fillRect(0, 0, 512, 512);
	for (let i = 0; i < 9e3; i++) {
		const n = Math.random();
		ctx.fillStyle = n > .5 ? `rgba(255,255,255,${n * .06})` : `rgba(0,0,0,${(1 - n) * .1})`;
		ctx.fillRect(Math.random() * 512, Math.random() * 512, 1 + Math.random() * 3, 1 + Math.random() * 3);
	}
	for (let i = 0; i < 18; i++) {
		ctx.strokeStyle = `rgba(0,0,0,${.08 + Math.random() * .08})`;
		ctx.beginPath();
		ctx.moveTo(Math.random() * 512, Math.random() * 512);
		ctx.lineTo(Math.random() * 512, Math.random() * 512);
		ctx.stroke();
	}
	const t = new CanvasTexture(c);
	t.wrapS = t.wrapT = RepeatWrapping;
	t.repeat.set(14, 14);
	t.anisotropy = 8;
	t.colorSpace = SRGBColorSpace;
	return t;
}
function makeEarthTexture() {
	const w = 1024;
	const h = 512;
	const c = document.createElement("canvas");
	c.width = w;
	c.height = h;
	const ctx = c.getContext("2d");
	const g = ctx.createLinearGradient(0, 0, 0, h);
	g.addColorStop(0, "#e8eef4");
	g.addColorStop(.08, "#1c4d86");
	g.addColorStop(.5, "#0b356c");
	g.addColorStop(.9, "#1c4d86");
	g.addColorStop(1, "#e8eef4");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, w, h);
	const land = (draw, color = "#3a6b3a") => {
		ctx.fillStyle = color;
		ctx.beginPath();
		draw(ctx);
		ctx.fill();
	};
	land((p) => {
		p.moveTo(220, 90);
		p.bezierCurveTo(180, 120, 190, 180, 230, 210);
		p.bezierCurveTo(250, 250, 240, 310, 255, 360);
		p.bezierCurveTo(260, 410, 230, 450, 250, 470);
		p.bezierCurveTo(280, 430, 290, 360, 270, 300);
		p.bezierCurveTo(300, 230, 280, 160, 250, 110);
		p.closePath();
	});
	land((p) => {
		p.moveTo(250, 110);
		p.bezierCurveTo(300, 80, 360, 90, 380, 130);
		p.bezierCurveTo(350, 170, 300, 160, 250, 140);
		p.closePath();
	}, "#4a7a45");
	land((p) => {
		p.moveTo(520, 90);
		p.bezierCurveTo(600, 70, 760, 90, 820, 140);
		p.bezierCurveTo(860, 170, 900, 160, 930, 200);
		p.bezierCurveTo(880, 210, 800, 180, 740, 190);
		p.bezierCurveTo(680, 220, 620, 180, 540, 160);
		p.closePath();
	}, "#6a7a48");
	land((p) => {
		p.moveTo(560, 180);
		p.bezierCurveTo(610, 190, 640, 250, 630, 330);
		p.bezierCurveTo(610, 390, 560, 400, 540, 340);
		p.bezierCurveTo(520, 260, 530, 200, 560, 180);
		p.closePath();
	}, "#8a7a4a");
	land((p) => {
		p.moveTo(760, 200);
		p.bezierCurveTo(840, 210, 900, 250, 880, 300);
		p.bezierCurveTo(820, 280, 780, 260, 760, 220);
		p.closePath();
	}, "#4a6b3a");
	land((p) => {
		p.moveTo(880, 360);
		p.bezierCurveTo(940, 350, 980, 380, 960, 420);
		p.bezierCurveTo(910, 430, 870, 400, 880, 360);
		p.closePath();
	}, "#7a6a40");
	land((p) => {
		p.moveTo(380, 40);
		p.bezierCurveTo(420, 30, 450, 60, 430, 90);
		p.bezierCurveTo(400, 80, 370, 60, 380, 40);
		p.closePath();
	}, "#dfe6ee");
	const t = new CanvasTexture(c);
	t.colorSpace = SRGBColorSpace;
	t.anisotropy = 8;
	return t;
}
var MatCtx = (0, import_react.createContext)(null);
var ClipCtx = (0, import_react.createContext)([]);
function make(color, metalness, roughness, map) {
	const m = new MeshStandardMaterial({
		color,
		metalness,
		roughness,
		map: map ?? null,
		envMapIntensity: 1.35,
		emissive: "#101114",
		emissiveIntensity: .18
	});
	m.userData.metalness = metalness;
	m.userData.roughness = roughness;
	m.userData.opacity = 1;
	return m;
}
function createBag() {
	const brushed = makeBrushedTexture();
	return {
		steel: make(STEEL, .78, .32, brushed),
		steelDark: make(STEEL_DARK, .72, .38, brushed),
		soot: make(STEEL_SOOT, .55, .52),
		tile: make(TILE, .12, .78),
		nozzle: make(NOZZLE, .58, .42),
		nozzleVac: make(NOZZLE_VAC, .55, .44),
		pump: make(PUMP, .7, .34),
		glass: make(GLASS, .15, .05),
		lox: make(CRYO_LOX, .15, .55),
		ch4: make(CRYO_CH4, .12, .58),
		structure: make(STRUCTURE, .75, .45),
		titanium: make(TITANIUM, .8, .38),
		black: make("#111214", .4, .55),
		pad: make("#6a6c6f", .05, .78)
	};
}
function applyMode(bag, mode, planes) {
	const list = Object.values(bag);
	for (const m of list) {
		m.clippingPlanes = planes;
		m.clipShadows = planes.length > 0;
		const baseM = m.userData.metalness;
		const baseR = m.userData.roughness;
		if (mode === "solid") {
			m.transparent = false;
			m.opacity = 1;
			m.depthWrite = true;
			m.wireframe = false;
			m.side = 2;
			m.metalness = baseM;
			m.roughness = baseR;
			m.emissive.set("#000000");
		} else if (mode === "wireframe") {
			m.transparent = false;
			m.opacity = 1;
			m.depthWrite = true;
			m.wireframe = true;
			m.side = 2;
			m.metalness = .1;
			m.roughness = .8;
			m.emissive.set("#000000");
		} else if (mode === "xray") {
			m.transparent = true;
			m.opacity = .16;
			m.depthWrite = false;
			m.wireframe = false;
			m.side = 2;
			m.metalness = .05;
			m.roughness = .35;
			m.emissive.set("#1c2228");
		} else {
			m.transparent = true;
			m.opacity = .38;
			m.depthWrite = false;
			m.wireframe = false;
			m.side = 2;
			m.metalness = baseM;
			m.roughness = baseR;
			m.emissive.set("#000000");
		}
		m.needsUpdate = true;
	}
	bag.glass.transparent = true;
	bag.glass.opacity = mode === "solid" ? .45 : mode === "xray" ? .2 : .3;
	bag.glass.depthWrite = false;
}
function MaterialsProvider({ children, planes }) {
	const bag = (0, import_react.useMemo)(() => createBag(), []);
	const mode = useViewer((s) => s.viewMode);
	(0, import_react.useLayoutEffect)(() => {
		applyMode(bag, mode, planes);
	}, [
		bag,
		mode,
		planes
	]);
	(0, import_react.useEffect)(() => {
		return () => {
			for (const m of Object.values(bag)) {
				m.map?.dispose();
				m.dispose();
			}
		};
	}, [bag]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipCtx.Provider, {
		value: planes,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatCtx.Provider, {
			value: bag,
			children
		})
	});
}
function useMats() {
	const ctx = (0, import_react.useContext)(MatCtx);
	if (!ctx) throw new Error("useMats outside provider");
	return ctx;
}
function onPartClick(id, e) {
	e.stopPropagation();
	const s = useViewer.getState();
	if (s.measureMode) {
		s.setMeasurePoint([
			e.point.x,
			e.point.y,
			e.point.z
		]);
		return;
	}
	s.select(s.selectedId === id ? null : id);
}
function Part({ id, children, position, rotation }) {
	const exploded = useViewer((s) => s.exploded);
	const selected = useViewer((s) => s.selectedId === id);
	const hovered = useViewer((s) => s.hoveredId === id);
	useCursor(hovered || selected);
	const def = CATALOG[id];
	const t = smoothstep(exploded);
	const ex = def?.explode ?? [
		0,
		0,
		0
	];
	const p0 = position ?? [
		0,
		0,
		0
	];
	const pos = [
		p0[0] + ex[0] * t,
		p0[1] + ex[1] * t,
		p0[2] + ex[2] * t
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		name: id,
		position: pos,
		rotation,
		onClick: (e) => onPartClick(id, e),
		onPointerOver: (e) => {
			e.stopPropagation();
			useViewer.getState().setHovered(id);
		},
		onPointerOut: () => {
			if (useViewer.getState().hoveredId === id) useViewer.getState().setHovered(null);
		},
		children
	});
}
function Highlight({ active }) {
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlines, {
		thickness: 2.8,
		color: "#f4f6f8",
		angle: Math.PI,
		screenspace: true
	});
}
function EngineFlame({ active, scale = 1, vac = false }) {
	const outer = (0, import_react.useRef)(null);
	const inner = (0, import_react.useRef)(null);
	useFrame((state) => {
		const t = state.clock.elapsedTime;
		const flicker = 1 + Math.sin(t * 47) * .12 + Math.sin(t * 23.7) * .07;
		if (outer.current) {
			outer.current.visible = active;
			outer.current.scale.set(.85 * scale * flicker, (vac ? 2.6 : 2.15) * scale * flicker, .85 * scale * flicker);
		}
		if (inner.current) {
			inner.current.visible = active;
			inner.current.scale.set(.42 * scale, (vac ? 2.1 : 1.7) * scale * flicker, .42 * scale);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			ref: outer,
			position: [
				0,
				-.15,
				0
			],
			rotation: [
				Math.PI,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
				.55,
				1,
				16,
				1,
				true
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#ff9a4a",
				transparent: true,
				opacity: .72,
				depthWrite: false,
				blending: 2,
				side: 2
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			ref: inner,
			position: [
				0,
				-.1,
				0
			],
			rotation: [
				Math.PI,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
				.55,
				1,
				12,
				1,
				true
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#fff4d8",
				transparent: true,
				opacity: .9,
				depthWrite: false,
				blending: 2,
				side: 2
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			color: "#ff8c3a",
			intensity: active ? 18 * scale : 0,
			distance: 22,
			decay: 2
		})
	] });
}
function Raptor({ variant, selected }) {
	const mats = useMats();
	const vac = variant === "vac";
	const bell = (0, import_react.useMemo)(() => createBellGeometry(vac ? 1.12 : .62, vac ? 3.25 : 2.45), [vac]);
	useViewer((s) => {
		if (s.appMode !== "launch") return false;
		return s.launchPhase === "ignition" || s.launchPhase === "liftoff" || s.launchPhase === "ascent";
	}) && useViewer((s) => s.showBooster && s.altitude < 1);
	const showFlame = useViewer((s) => {
		if (s.appMode === "cinematic" && (s.scenario === "space" || s.scenario === "orbit")) return true;
		if (s.appMode !== "launch") return false;
		if (!s.showBooster) return s.launchPhase === "ignition" || s.launchPhase === "liftoff" || s.launchPhase === "ascent";
		return false;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.62,
				0
			],
			castShadow: true,
			material: mats.pump,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.36,
				.4,
				.78,
				14
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.28,
				0
			],
			material: mats.steelDark,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				.3,
				.045,
				8,
				18
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: bell,
			castShadow: true,
			material: vac ? mats.nozzleVac : mats.nozzle,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected })
		}),
		!vac && [
			.4,
			.9,
			1.4,
			1.9
		].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				-y,
				0
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			material: mats.steelDark,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				.28 + y * .14,
				.018,
				6,
				20
			] })
		}, y)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				0,
				vac ? -3.1 : -2.35,
				0
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			material: mats.black,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				vac ? 1.1 : .6,
				.03,
				6,
				24
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineFlame, {
			active: showFlame,
			vac,
			scale: vac ? 1.15 : 1
		})
	] });
}
function WeldRings({ from, to, material }) {
	const count = Math.max(1, Math.round((to - from) / SHIP.ringH) - 1);
	const mesh = (0, import_react.useRef)(null);
	(0, import_react.useLayoutEffect)(() => {
		if (!mesh.current) return;
		const dummy = new Object3D();
		for (let i = 0; i < count; i++) {
			dummy.position.set(0, from + (i + 1) * SHIP.ringH, 0);
			dummy.updateMatrix();
			mesh.current.setMatrixAt(i, dummy.matrix);
		}
		mesh.current.instanceMatrix.needsUpdate = true;
	}, [count, from]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("instancedMesh", {
		ref: mesh,
		args: [
			void 0,
			void 0,
			count
		],
		frustumCulled: false,
		material,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
			R + .018,
			R + .018,
			.055,
			64
		] })
	});
}
function HeatShield() {
	const mats = useMats();
	const mesh = (0, import_react.useRef)(null);
	const selected = useViewer((s) => s.selectedId === "heatShield");
	const COUNT = 980;
	(0, import_react.useLayoutEffect)(() => {
		if (!mesh.current) return;
		const dummy = new Object3D();
		const up = new Vector3(0, 1, 0);
		const normal = new Vector3();
		let i = 0;
		const place = (x, y, z, nx, ny, nz, s = 1) => {
			dummy.position.set(x, y, z);
			dummy.scale.setScalar(s);
			normal.set(nx, ny, nz).normalize();
			dummy.quaternion.setFromUnitVectors(up, normal);
			dummy.updateMatrix();
			mesh.current.setMatrixAt(i++, dummy.matrix);
		};
		const rows = 36;
		const cols = 22;
		for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
			const y = Y.skirt1 - .2 + row * .92;
			if (y > Y.pay1 + .4) continue;
			const offset = row % 2 * .5;
			const t = (col + offset) / cols;
			const theta = -.56 * Math.PI + t * 1.12 * Math.PI;
			const rr = R + .035;
			place(Math.sin(theta) * rr, y, -Math.cos(theta) * rr, Math.sin(theta), 0, -Math.cos(theta));
		}
		for (let row = 0; row < 14; row++) {
			const t = (row + .4) / 14;
			const y = Y.pay1 + SHIP.noseH * (1 - t);
			const localT = 1 - (y - Y.pay1) / SHIP.noseH;
			const rr = R * Math.pow(Math.sin(localT * Math.PI / 2), .78) + .04;
			const colsN = Math.max(6, Math.round(18 * (rr / R)));
			for (let col = 0; col < colsN; col++) {
				const offset = row % 2 * .5;
				const u = (col + offset) / colsN;
				const theta = -.5 * Math.PI + u * Math.PI;
				const slope = .22 * (1 - localT);
				place(Math.sin(theta) * rr, y, -Math.cos(theta) * rr, Math.sin(theta), slope, -Math.cos(theta), .85);
			}
		}
		dummy.scale.setScalar(0);
		dummy.position.set(0, -999, 0);
		dummy.updateMatrix();
		while (i < COUNT) mesh.current.setMatrixAt(i++, dummy.matrix);
		mesh.current.instanceMatrix.needsUpdate = true;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref: mesh,
		args: [
			void 0,
			void 0,
			COUNT
		],
		castShadow: true,
		frustumCulled: false,
		material: mats.tile,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
			.255,
			.255,
			.048,
			6
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected })]
	});
}
function Interior() {
	const mats = useMats();
	const mode = useViewer((s) => s.viewMode);
	const section = useViewer((s) => s.sectionEnabled);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		visible: mode !== "solid" || section,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: "loxTank",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						(Y.skirt1 + Y.lox1) / 2,
						0
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							R - .16,
							R - .16,
							SHIP.loxH - .4,
							48,
							1,
							true
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#c5d4e4",
							metalness: .12,
							roughness: .55,
							side: 2,
							transparent: mode !== "solid",
							opacity: mode === "xray" ? .35 : 1,
							clippingPlanes: mats.lox.clippingPlanes,
							clipShadows: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: useViewer.getState().selectedId === "loxTank" })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: "ch4Tank",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						(Y.lox1 + Y.ch41) / 2,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						R - .16,
						R - .16,
						SHIP.ch4H - .4,
						48,
						1,
						true
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#d7cfc4",
						metalness: .12,
						roughness: .58,
						side: 2,
						clippingPlanes: mats.ch4.clippingPlanes,
						clipShadows: true
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: "commonDome",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						Y.lox1,
						0
					],
					scale: [
						1,
						.34,
						1
					],
					material: mats.steelDark,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						R - .18,
						40,
						24
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: "headerLox",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						Y.pay1 + 10.4,
						0
					],
					material: mats.lox,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						1.55,
						24,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: "headerCh4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						Y.lox1 + 1.7,
						0
					],
					material: mats.ch4,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						1.35,
						24,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Part, {
				id: "downcomer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							1.15,
							12.4,
							0
						],
						material: mats.steelDark,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.28,
							.28,
							20.4,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							-.9,
							10.5,
							1.1
						],
						rotation: [
							.1,
							0,
							-.08
						],
						material: mats.steelDark,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.16,
							.16,
							12,
							10
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							-.9,
							10.5,
							-1.1
						],
						rotation: [
							-.1,
							0,
							-.08
						],
						material: mats.steelDark,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.16,
							.16,
							12,
							10
						] })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: "thrustPuck",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						Y.skirt1 - .15,
						0
					],
					material: mats.soot,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						3.4,
						3.6,
						.55,
						32
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: "copv",
				children: [
					[
						2.4,
						2.3,
						1.8
					],
					[
						-2.4,
						2.3,
						1.8
					],
					[
						2.4,
						2.3,
						-1.8
					],
					[
						-2.4,
						2.3,
						-1.8
					],
					[
						0,
						2.6,
						2.9
					],
					[
						0,
						2.6,
						-2.9
					]
				].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: p,
					material: mats.black,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.42,
						16,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {})]
				}, i))
			})
		]
	});
}
function Starship() {
	const mats = useMats();
	const selected = useViewer((s) => s.selectedId);
	const nose = (0, import_react.useMemo)(() => createNoseGeometry(), []);
	const aftFlap = (0, import_react.useMemo)(() => createFlapGeometry(7.8, 9.2, 4.6, .32), []);
	const fwdFlap = (0, import_react.useMemo)(() => createFlapGeometry(5.2, 4.4, 2.2, .18), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		name: "starship",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Part, {
				id: "engineBay",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							SHIP.skirtH / 2,
							0
						],
						castShadow: true,
						receiveShadow: true,
						material: mats.soot,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							R,
							R,
							SHIP.skirtH,
							64,
							1,
							true
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected === "engineBay" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.04,
							0
						],
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						material: mats.soot,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
							3.5,
							R,
							48
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeldRings, {
						from: 0,
						to: Y.skirt1,
						material: mats.steelDark
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Part, {
				id: "loxTank",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						(Y.skirt1 + Y.lox1) / 2,
						0
					],
					castShadow: true,
					receiveShadow: true,
					material: mats.steel,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						R,
						R,
						SHIP.loxH,
						64,
						1,
						true
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected === "loxTank" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeldRings, {
					from: Y.skirt1,
					to: Y.lox1,
					material: mats.steelDark
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Part, {
				id: "ch4Tank",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						(Y.lox1 + Y.ch41) / 2,
						0
					],
					castShadow: true,
					receiveShadow: true,
					material: mats.steel,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						R,
						R,
						SHIP.ch4H,
						64,
						1,
						true
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected === "ch4Tank" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeldRings, {
					from: Y.lox1,
					to: Y.ch41,
					material: mats.steelDark
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Part, {
				id: "payloadBay",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						(Y.ch41 + Y.pay1) / 2,
						0
					],
					castShadow: true,
					receiveShadow: true,
					material: mats.steel,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						R,
						R,
						SHIP.payloadH,
						64,
						1,
						true
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected === "payloadBay" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeldRings, {
					from: Y.ch41,
					to: Y.pay1,
					material: mats.steelDark
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Part, {
				id: "pezDoor",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						R + .04,
						(Y.ch41 + Y.pay1) / 2,
						0
					],
					rotation: [
						0,
						0,
						0
					],
					castShadow: true,
					material: mats.steelDark,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.12,
						4.6,
						3.4
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected === "pezDoor" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						R + .08,
						(Y.ch41 + Y.pay1) / 2 + 2.1,
						0
					],
					material: mats.black,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.08,
						.16,
						3.5
					] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Part, {
				id: "noseCone",
				position: [
					0,
					Y.pay1,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: nose,
					castShadow: true,
					receiveShadow: true,
					material: mats.steel,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected === "noseCone" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					position: [
						0,
						SHIP.noseH - .12,
						0
					],
					material: mats.tile,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.22,
						16,
						12
					] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: "raceway",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						22.4,
						R + .12
					],
					castShadow: true,
					material: mats.steelDark,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.55,
						34.5,
						.22
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected === "raceway" })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: "aftFlapPort",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						-R + .15,
						10.2,
						0
					],
					rotation: [
						0,
						Math.PI,
						.08
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: aftFlap,
							castShadow: true,
							material: mats.steel,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected === "aftFlapPort" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								3.8,
								0,
								-.2
							],
							rotation: [
								0,
								0,
								0
							],
							material: mats.tile,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								6.4,
								7.2,
								.06
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								.4,
								0,
								0
							],
							rotation: [
								0,
								0,
								Math.PI / 2
							],
							material: mats.steelDark,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.22,
								.22,
								1.1,
								12
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								2.4,
								.8,
								.15
							],
							rotation: [
								0,
								0,
								1.15
							],
							material: mats.pump,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.09,
								.09,
								3.2,
								8
							] })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: "aftFlapStbd",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						R - .15,
						10.2,
						0
					],
					rotation: [
						0,
						0,
						-.08
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: aftFlap,
							castShadow: true,
							material: mats.steel,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected === "aftFlapStbd" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								3.8,
								0,
								-.2
							],
							material: mats.tile,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								6.4,
								7.2,
								.06
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								.4,
								0,
								0
							],
							rotation: [
								0,
								0,
								Math.PI / 2
							],
							material: mats.steelDark,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.22,
								.22,
								1.1,
								12
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							position: [
								2.4,
								.8,
								.15
							],
							rotation: [
								0,
								0,
								1.15
							],
							material: mats.pump,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.09,
								.09,
								3.2,
								8
							] })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: "fwdFlapPort",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						-2.6,
						41.2,
						2.55
					],
					rotation: [
						.15,
						Math.PI * .72,
						.35
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: fwdFlap,
						castShadow: true,
						material: mats.steel,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected === "fwdFlapPort" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							.2,
							0,
							0
						],
						rotation: [
							0,
							0,
							Math.PI / 2
						],
						material: mats.steelDark,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.14,
							.14,
							.7,
							10
						] })
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: "fwdFlapStbd",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						2.6,
						41.2,
						2.55
					],
					rotation: [
						.15,
						-Math.PI * .72,
						-.35
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: fwdFlap,
						castShadow: true,
						material: mats.steel,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected === "fwdFlapStbd" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							.2,
							0,
							0
						],
						rotation: [
							0,
							0,
							Math.PI / 2
						],
						material: mats.steelDark,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.14,
							.14,
							.7,
							10
						] })
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: "heatShield",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatShield, {})
			}),
			SHIP_SL.map(([x, z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: `raptorSL${i + 1}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					position: [
						x,
						.15,
						z
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Raptor, {
						variant: "sl",
						selected: selected === `raptorSL${i + 1}`
					})
				})
			}, `sl${i}`)),
			SHIP_VAC.map(([x, z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: `raptorVac${i + 1}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					position: [
						x,
						.15,
						z
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Raptor, {
						variant: "vac",
						selected: selected === `raptorVac${i + 1}`
					})
				})
			}, `vac${i}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Interior, {})
		]
	});
}
function GridFin({ rotationY }) {
	const mats = useMats();
	const bars = (0, import_react.useMemo)(() => {
		const list = [];
		const w = 3.6;
		const h = 4.4;
		const t = .07;
		list.push({
			pos: [
				0,
				0,
				0
			],
			size: [
				w,
				t,
				t
			]
		});
		list.push({
			pos: [
				0,
				h,
				0
			],
			size: [
				w,
				t,
				t
			]
		});
		list.push({
			pos: [
				-3.6 / 2,
				h / 2,
				0
			],
			size: [
				t,
				h,
				t
			]
		});
		list.push({
			pos: [
				w / 2,
				h / 2,
				0
			],
			size: [
				t,
				h,
				t
			]
		});
		const n = 7;
		for (let i = 1; i < n; i++) {
			list.push({
				pos: [
					-3.6 / 2 + i * w / n,
					h / 2,
					0
				],
				size: [
					t * .7,
					h,
					t * .7
				]
			});
			list.push({
				pos: [
					0,
					i * h / n,
					0
				],
				size: [
					w,
					t * .7,
					t * .7
				]
			});
		}
		return list;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		rotation: [
			0,
			rotationY,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				R + .15,
				0,
				0
			],
			rotation: [
				0,
				0,
				-.15
			],
			children: bars.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				position: b.pos,
				castShadow: true,
				material: mats.titanium,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: b.size })
			}, i))
		})
	});
}
function BoosterCluster() {
	const mats = useMats();
	const mesh = (0, import_react.useRef)(null);
	const pumps = (0, import_react.useRef)(null);
	const bell = (0, import_react.useMemo)(() => createBellGeometry(.55, 2.28), []);
	const firing = useViewer((s) => {
		if (s.appMode !== "launch") return false;
		return s.launchPhase === "ignition" || s.launchPhase === "liftoff" || s.launchPhase === "ascent";
	});
	const selected = useViewer((s) => s.selectedId === "boosterEngines");
	(0, import_react.useLayoutEffect)(() => {
		if (!mesh.current || !pumps.current) return;
		const dummy = new Object3D();
		BOOSTER_ENGINES.forEach(([x, z], i) => {
			dummy.position.set(x, .1, z);
			dummy.rotation.set(0, 0, 0);
			dummy.updateMatrix();
			mesh.current.setMatrixAt(i, dummy.matrix);
			dummy.position.set(x, .45, z);
			dummy.updateMatrix();
			pumps.current.setMatrixAt(i, dummy.matrix);
		});
		mesh.current.instanceMatrix.needsUpdate = true;
		pumps.current.instanceMatrix.needsUpdate = true;
	}, []);
	const flameRef = (0, import_react.useRef)(null);
	useFrame((state) => {
		if (!flameRef.current) return;
		flameRef.current.visible = firing;
		const f = 1 + Math.sin(state.clock.elapsedTime * 38) * .08;
		flameRef.current.scale.set(1, f, 1);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("instancedMesh", {
			ref: mesh,
			args: [
				bell,
				mats.nozzle,
				BOOSTER_ENGINES.length
			],
			castShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("instancedMesh", {
			ref: pumps,
			args: [
				void 0,
				void 0,
				BOOSTER_ENGINES.length
			],
			material: mats.pump,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.26,
				.3,
				.48,
				8
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: flameRef,
			position: [
				0,
				-.2,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						Math.PI,
						0,
						0
					],
					position: [
						0,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
						4.4,
						14,
						24,
						1,
						true
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						color: "#ff8a3a",
						transparent: true,
						opacity: .55,
						depthWrite: false,
						blending: 2,
						side: 2
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						Math.PI,
						0,
						0
					],
					position: [
						0,
						.4,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
						2.2,
						9,
						16,
						1,
						true
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						color: "#ffe9b8",
						transparent: true,
						opacity: .75,
						depthWrite: false,
						blending: 2,
						side: 2
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
					color: "#ff7a30",
					intensity: firing ? 80 : 0,
					distance: 60
				})
			]
		})
	] });
}
function Booster() {
	const mats = useMats();
	const selected = useViewer((s) => s.selectedId);
	const bodyH = BOOSTER.height - BOOSTER.hotStageH;
	const firing = useViewer((s) => {
		if (s.appMode !== "launch") return false;
		return s.launchPhase === "ignition" || s.launchPhase === "liftoff" || s.launchPhase === "ascent";
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		name: "superheavy",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Part, {
				id: "boosterBarrel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							bodyH / 2,
							0
						],
						castShadow: true,
						receiveShadow: true,
						material: mats.steel,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							R,
							R,
							bodyH,
							64
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected === "boosterBarrel" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.05,
							0
						],
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						material: mats.soot,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
							3.6,
							R,
							48
						] })
					}),
					Array.from({ length: 32 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							2.2 + i * 1.83,
							0
						],
						material: mats.steelDark,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							R + .016,
							R + .016,
							.05,
							48
						] })
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							28,
							R + .12
						],
						material: mats.steelDark,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.5,
							48,
							.2
						] })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Part, {
				id: "hotStage",
				position: [
					0,
					bodyH,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						BOOSTER.hotStageH / 2,
						0
					],
					castShadow: true,
					material: mats.soot,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						R + .08,
						R + .05,
						BOOSTER.hotStageH,
						32,
						1,
						true
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected === "hotStage" })]
				}), Array.from({ length: 16 }, (_, i) => {
					const a = i / 16 * Math.PI * 2;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							Math.sin(a) * (R + .1),
							BOOSTER.hotStageH * .5,
							Math.cos(a) * (R + .1)
						],
						material: mats.black,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.1,
							1.8,
							.12
						] })
					}, i);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
				id: "gridFins",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						0,
						61.5,
						0
					],
					children: [[
						Math.PI / 4,
						3 * Math.PI / 4,
						5 * Math.PI / 4,
						7 * Math.PI / 4
					].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridFin, { rotationY: a }, a)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { active: selected === "gridFins" })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Part, {
				id: "boosterEngines",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoosterCluster, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineFlame, { active: false })]
			}),
			firing ? null : null
		]
	});
}
function EnvMap() {
	const gl = useThree((s) => s.gl);
	const scene = useThree((s) => s.scene);
	const scenario = useViewer((s) => s.scenario);
	(0, import_react.useEffect)(() => {
		const pmrem = new PMREMGenerator(gl);
		const room = new RoomEnvironment();
		const tex = pmrem.fromScene(room, .04).texture;
		scene.environment = tex;
		scene.environmentIntensity = scenario === "space" || scenario === "orbit" ? .22 : scenario === "hangar" ? .7 : .95;
		return () => {
			scene.environment = null;
			tex.dispose();
			pmrem.dispose();
		};
	}, [
		gl,
		scene,
		scenario
	]);
	return null;
}
function LaunchSite() {
	const concrete = (0, import_react.useMemo)(() => makeConcreteTexture(), []);
	(0, import_react.useEffect)(() => () => concrete.dispose(), [concrete]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sky, {
			sunPosition: [
				80,
				28,
				40
			],
			turbidity: 4.5,
			rayleigh: .85,
			mieCoefficient: .004,
			mieDirectionalG: .85
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#c8d4e2",
			"#3a342c",
			.55
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				60,
				80,
				30
			],
			intensity: 2.4,
			castShadow: true,
			"shadow-mapSize": [2048, 2048],
			"shadow-camera-near": 1,
			"shadow-camera-far": 280,
			"shadow-camera-left": -90,
			"shadow-camera-right": 90,
			"shadow-camera-top": 90,
			"shadow-camera-bottom": -90,
			color: "#fff4e0"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-.04,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [220, 64] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: concrete,
				roughness: .92,
				metalness: .04,
				color: "#8a8c8f"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-.2,
				80
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [900, 700] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#0c3a4a",
				roughness: .35,
				metalness: .25
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.02,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				12,
				28,
				48
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#4e5156",
				roughness: .7,
				metalness: .3
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-3.2,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				11,
				12,
				6.4,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3a3d42",
				roughness: .55,
				metalness: .6
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-6.4,
				8
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				16,
				5,
				22
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#2c2f34",
				metalness: .5,
				roughness: .6
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mechazilla, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TankFarm, {})
	] });
}
function Mechazilla() {
	const x = 16.5;
	const h = 146;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			x,
			0,
			0
		],
		children: [
			[-4.2, 4.2].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					h / 2,
					z
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.4,
					h,
					2.4
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#2e3238",
					metalness: .7,
					roughness: .4
				})]
			}), Array.from({ length: 18 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					8 + i * 7.5,
					z
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					3.2,
					.35,
					3.2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3c424a",
					metalness: .65,
					roughness: .45
				})]
			}, i))] }, z)),
			Array.from({ length: 16 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					10 + i * 8.2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.2,
					.4,
					8.4
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3c424a",
					metalness: .65,
					roughness: .45
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-6.5,
					118,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					14,
					1.6,
					9
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3a3f46",
					metalness: .7,
					roughness: .38
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-6.5,
					72,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					10,
					1.2,
					7
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3a3f46",
					metalness: .7,
					roughness: .38
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-5,
					40,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					8,
					1,
					2.2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#4a5060",
					metalness: .6,
					roughness: .4
				})]
			})
		]
	});
}
function TankFarm() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: [
			48,
			0,
			-28
		],
		children: [
			0,
			14,
			28
		].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				x,
				9,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				5.5,
				5.5,
				18,
				24
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#c9cdd2",
				metalness: .7,
				roughness: .32
			})]
		}, x))
	});
}
function Hangar() {
	const concrete = (0, import_react.useMemo)(() => makeConcreteTexture(), []);
	(0, import_react.useEffect)(() => () => concrete.dispose(), [concrete]);
	const w = 96;
	const d = 88;
	const h = 82;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#d8dde4",
			"#1a1c20",
			.7
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				12,
				60,
				8
			],
			intensity: 1.4,
			color: "#e8e4d8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-30,
				25,
				40
			],
			intensity: .9,
			color: "#c8d4e8"
		}),
		[
			[-24, w / 6],
			[w / 4, w / 6],
			[-24, -16],
			[w / 4, -16]
		].map(([x, z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("spotLight", {
			position: [
				x,
				76,
				z
			],
			angle: .7,
			penumbra: .5,
			intensity: 40,
			distance: 90,
			color: "#f0efe8",
			castShadow: i === 0
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				0,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [w, d] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: concrete,
				roughness: .9,
				metalness: .05,
				color: "#7a7c80"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				h / 2,
				-44
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				w,
				h,
				.8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1c1e22",
				metalness: .4,
				roughness: .7
			})]
		}),
		[-48, w / 2].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				x,
				h / 2,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.8,
				h,
				d
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1a1c20",
				metalness: .4,
				roughness: .7
			})]
		}, x)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				h,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				w,
				.6,
				d
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#14161a",
				metalness: .5,
				roughness: .6
			})]
		}),
		Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-42 + i * 8.5,
				80,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.5,
				1.2,
				84
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#2a2e34",
				metalness: .7,
				roughness: .4
			})]
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				74,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				88,
				.4,
				2.4
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3a4048",
				metalness: .75,
				roughness: .35
			})]
		})
	] });
}
function Earth() {
	const tex = (0, import_react.useMemo)(() => makeEarthTexture(), []);
	(0, import_react.useEffect)(() => () => tex.dispose(), [tex]);
	const close = useViewer((s) => s.scenario === "orbit");
	const r = close ? 220 : 90;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: close ? [
			40,
			-248,
			-120
		] : [
			180,
			-40,
			-420
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				r,
				64,
				48
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: tex,
				roughness: .9,
				metalness: .05
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				scale: 1.035,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					r,
					48,
					32
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#4a9dff",
					transparent: true,
					opacity: .14,
					side: 1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				scale: 1.08,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					r,
					32,
					24
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#7ec4ff",
					transparent: true,
					opacity: .06,
					side: 1
				})]
			})
		]
	});
}
function SpaceLights() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
			radius: 600,
			depth: 90,
			count: 7e3,
			factor: 3.2,
			saturation: 0,
			fade: true,
			speed: .35
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				80,
				40,
				20
			],
			intensity: 3.2,
			color: "#fff6e8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .08 })
	] });
}
function World() {
	const scenario = useViewer((s) => s.scenario);
	const showGrid = useViewer((s) => s.showGrid);
	const showAxes = useViewer((s) => s.showAxes);
	const showBooster = useViewer((s) => s.showBooster);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvMap, {}),
		scenario === "launchpad" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LaunchSite, {}),
		scenario === "hangar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hangar, {}),
		(scenario === "space" || scenario === "orbit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpaceLights, {}),
		scenario === "orbit" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, {}),
		scenario === "space" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, {}),
		scenario === "hangar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#0b0c0e"]
		}),
		(scenario === "space" || scenario === "orbit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#010102"]
		}),
		showGrid && (scenario === "launchpad" || scenario === "hangar") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
			position: [
				0,
				.03,
				0
			],
			args: [120, 120],
			cellSize: 2,
			cellThickness: .6,
			sectionSize: 10,
			sectionThickness: 1.1,
			cellColor: "#3a4048",
			sectionColor: "#6a7380",
			fadeDistance: 140,
			infiniteGrid: true
		}),
		showAxes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("axesHelper", { args: [showBooster ? BOOSTER.height : 20] })
	] });
}
function shipBaseY(showBooster) {
	return showBooster ? BOOSTER.height : 0;
}
function visibleMid(showBooster) {
	return showBooster ? (BOOSTER.height + SHIP.height) * .42 : SHIP.height * .42;
}
var PRESETS = {
	iso: (b) => {
		const m = visibleMid(b);
		return {
			pos: new Vector3(28, m + 4, 42),
			target: new Vector3(0, m, 0)
		};
	},
	front: (b) => {
		const m = visibleMid(b);
		return {
			pos: new Vector3(0, m, b ? 160 : 95),
			target: new Vector3(0, m, 0)
		};
	},
	side: (b) => {
		const m = visibleMid(b);
		return {
			pos: new Vector3(b ? 160 : 95, m, 0),
			target: new Vector3(0, m, 0)
		};
	},
	top: (b) => {
		const top = b ? BOOSTER.height + SHIP.height : SHIP.height;
		return {
			pos: new Vector3(.2, top + 70, .2),
			target: new Vector3(0, top * .4, 0)
		};
	},
	aft: (b) => {
		const y = shipBaseY(b);
		return {
			pos: new Vector3(10, y - 8, -32),
			target: new Vector3(0, y + 4, 0)
		};
	},
	engines: (b) => {
		const y = shipBaseY(b);
		return {
			pos: new Vector3(8, y - 5, 14),
			target: new Vector3(0, y + 2, 0)
		};
	},
	nose: (b) => {
		const y = shipBaseY(b) + SHIP.height;
		return {
			pos: new Vector3(12, y - 4, 18),
			target: new Vector3(0, y - 6, 0)
		};
	}
};
function CameraRig() {
	const controls = (0, import_react.useRef)(null);
	const camera = useThree((s) => s.camera);
	const appMode = useViewer((s) => s.appMode);
	const view = useViewer((s) => s.cameraView);
	const tick = useViewer((s) => s.cameraTick);
	const focusId = useViewer((s) => s.focusId);
	const showBooster = useViewer((s) => s.showBooster);
	const flying = (0, import_react.useRef)(true);
	const destPos = (0, import_react.useRef)(PRESETS.iso(false).pos.clone());
	const destTarget = (0, import_react.useRef)(PRESETS.iso(false).target.clone());
	(0, import_react.useEffect)(() => {
		const s = useViewer.getState();
		if (s.focusId && CATALOG[s.focusId]) {
			const def = CATALOG[s.focusId];
			const yOff = s.showBooster && def.vehicle === "ship" ? BOOSTER.height : 0;
			destTarget.current.set(def.anchor[0], def.anchor[1] + yOff, def.anchor[2]);
			destPos.current.set(def.anchor[0] + 14, def.anchor[1] + yOff + 4, def.anchor[2] + 16);
		} else {
			const p = PRESETS[s.cameraView](s.showBooster);
			destPos.current.copy(p.pos);
			destTarget.current.copy(p.target);
		}
		flying.current = true;
	}, [
		view,
		tick,
		focusId,
		showBooster
	]);
	useFrame((_, rawDt) => {
		const dt = Math.min(rawDt, .1);
		useViewer.getState().tickSim(dt);
		const s = useViewer.getState();
		const ctrl = controls.current;
		if (!ctrl) return;
		if (s.appMode === "inspect") {
			ctrl.enabled = !s.measureMode;
			if (flying.current) {
				camera.position.lerp(destPos.current, 1 - Math.exp(-3.6 * dt));
				ctrl.target.lerp(destTarget.current, 1 - Math.exp(-3.6 * dt));
				if (camera.position.distanceTo(destPos.current) < .2) flying.current = false;
			}
			ctrl.update();
			return;
		}
		ctrl.enabled = false;
		const alt = s.altitude;
		const base = visibleMid(s.showBooster);
		if (s.appMode === "launch") {
			const lookY = alt + base * .55;
			camera.position.lerp(new Vector3(42 + alt * .12, 10 + alt * .38, 70 + alt * .22), 1 - Math.exp(-1.4 * dt));
			ctrl.target.lerp(new Vector3(0, lookY, 0), 1 - Math.exp(-1.6 * dt));
			ctrl.update();
			return;
		}
		const t = s.cinematicT;
		const shot = Math.floor(t / 8) % 4;
		const local = t % 8;
		let pos;
		let target;
		const m = base;
		if (shot === 0) {
			const a = local * .22 + t * .05;
			pos = new Vector3(Math.cos(a) * 70, m + 6, Math.sin(a) * 70);
			target = new Vector3(0, m, 0);
		} else if (shot === 1) {
			pos = new Vector3(18, 3, 28);
			target = new Vector3(0, m * .7, 0);
		} else if (shot === 2) {
			pos = new Vector3(8, shipBaseY(s.showBooster) - 4, 10);
			target = new Vector3(0, shipBaseY(s.showBooster) + 2, 0);
		} else {
			const k = local / 8;
			pos = new Vector3(20 + k * 80, 8 + k * 40, 24 + k * 70);
			target = new Vector3(0, m, 0);
		}
		camera.position.lerp(pos, 1 - Math.exp(-1.1 * dt));
		ctrl.target.lerp(target, 1 - Math.exp(-1.2 * dt));
		ctrl.update();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
		ref: controls,
		makeDefault: true,
		enableDamping: true,
		dampingFactor: .08,
		minDistance: 6,
		maxDistance: 420,
		enablePan: true,
		target: [
			0,
			22,
			0
		],
		onStart: () => {
			flying.current = false;
		},
		enabled: appMode === "inspect"
	});
}
function ParticleField({ count, color, spread, height, active, upward = false, size = .22, additive = true }) {
	const ref = (0, import_react.useRef)(null);
	const seeds = (0, import_react.useMemo)(() => Float32Array.from({ length: count }, () => Math.random()), [count]);
	const geo = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		g.setAttribute("position", new BufferAttribute(new Float32Array(count * 3), 3));
		return g;
	}, [count]);
	useFrame((state) => {
		if (!ref.current) return;
		ref.current.visible = active;
		if (!active) return;
		const arr = geo.attributes.position.array;
		const t = state.clock.elapsedTime;
		for (let i = 0; i < count; i++) {
			const s = seeds[i];
			const life = (t * (.35 + s * .5) + s) % 1;
			const a = s * Math.PI * 2;
			const r = spread * (.15 + life) * (.4 + s);
			arr[i * 3] = Math.cos(a) * r;
			arr[i * 3 + 1] = upward ? life * height : -life * height;
			arr[i * 3 + 2] = Math.sin(a) * r * .85;
		}
		geo.attributes.position.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
		ref,
		geometry: geo,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			color,
			size,
			transparent: true,
			opacity: .7,
			depthWrite: false,
			blending: additive ? 2 : 1,
			sizeAttenuation: true
		})
	});
}
function LaunchFX() {
	const phase = useViewer((s) => s.launchPhase);
	const altitude = useViewer((s) => s.altitude);
	const ignition = phase === "ignition" || phase === "liftoff" || phase === "ascent";
	const deluge = phase === "countdown" || phase === "ignition" || phase === "liftoff";
	const t = useViewer((s) => s.launchTime);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			.2,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleField, {
			count: 900,
			color: "#ffb060",
			spread: 5.5,
			height: 28,
			active: ignition && altitude < 180,
			size: .28
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleField, {
			count: 500,
			color: "#fff0c8",
			spread: 2.8,
			height: 18,
			active: ignition && altitude < 180,
			size: .16
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: [
			0,
			.4,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleField, {
			count: 700,
			color: "#c8c4bc",
			spread: 18,
			height: 14,
			active: deluge && t > -5.2 && altitude < 40,
			upward: true,
			size: .45,
			additive: false
		})
	})] });
}
function MeasureGizmo() {
	const a = useViewer((s) => s.measureA);
	const b = useViewer((s) => s.measureB);
	if (!a) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: a,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			.14,
			12,
			12
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#e8eaed" })]
	}), b && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: b,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.14,
				12,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#e8eaed" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
			points: [a, b],
			color: "#e8eaed",
			lineWidth: 1.5
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
			position: [
				(a[0] + b[0]) / 2,
				(a[1] + b[1]) / 2,
				(a[2] + b[2]) / 2
			],
			center: true,
			style: { pointerEvents: "none" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-sm border border-border bg-surface px-2 py-1 font-mono text-xs text-fg",
				children: [Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]).toFixed(2), " m"]
			})
		})
	] })] });
}
function SectionPlane() {
	const enabled = useViewer((s) => s.sectionEnabled);
	const axis = useViewer((s) => s.sectionAxis);
	const pos = useViewer((s) => s.sectionPos);
	const booster = useViewer((s) => s.showBooster);
	if (!enabled) return null;
	const maxY = booster ? 130 : 54;
	const x = MathUtils.lerp(-6.2, 6.2, pos);
	const y = MathUtils.lerp(-2, maxY, pos);
	const z = MathUtils.lerp(-6.2, 6.2, pos);
	const position = axis === "x" ? [
		x,
		maxY / 2,
		0
	] : axis === "y" ? [
		0,
		y,
		0
	] : [
		0,
		maxY / 2,
		z
	];
	const rotation = axis === "x" ? [
		0,
		Math.PI / 2,
		0
	] : axis === "y" ? [
		Math.PI / 2,
		0,
		0
	] : [
		0,
		0,
		0
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position,
		rotation,
		renderOrder: 2,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [axis === "y" ? 20 : 24, axis === "y" ? 20 : maxY + 8] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			color: "#9aa8b8",
			transparent: true,
			opacity: .1,
			side: 2,
			depthWrite: false
		})]
	});
}
function SelectionLabel() {
	const id = useViewer((s) => s.selectedId);
	if (!id) return null;
	const def = CATALOG[id];
	if (!def) return null;
	const yOff = useViewer((s) => s.showBooster) && def.vehicle === "ship" ? 71 : 0;
	const p = [
		def.anchor[0],
		def.anchor[1] + yOff,
		def.anchor[2]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
		position: p,
		center: true,
		style: { pointerEvents: "none" },
		distanceFactor: 28,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-sm border border-border bg-surface/90 px-2 py-1 font-mono text-[10px] tracking-wide text-fg whitespace-nowrap",
			children: def.name
		})
	});
}
function PostFX() {
	const mode = useViewer((s) => s.appMode);
	const phase = useViewer((s) => s.launchPhase);
	const cinematic = mode === "cinematic";
	if (!cinematic && !(mode === "launch" && (phase === "ignition" || phase === "liftoff" || phase === "ascent"))) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EffectComposer, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloom, {
			intensity: cinematic ? .45 : 1.15,
			luminanceThreshold: .55,
			mipmapBlur: true
		}),
		cinematic ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthOfField, {
			focusDistance: .018,
			focalLength: .06,
			bokehScale: 2.2
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {}),
		cinematic ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, {
			darkness: .55,
			offset: .28
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {})
	] });
}
function SceneContent() {
	const enabled = useViewer((s) => s.sectionEnabled);
	const axis = useViewer((s) => s.sectionAxis);
	const pos = useViewer((s) => s.sectionPos);
	const booster = useViewer((s) => s.showBooster);
	const altitude = useViewer((s) => s.altitude);
	const plane = (0, import_react.useMemo)(() => new Plane(new Vector3(1, 0, 0), 0), []);
	const planes = (0, import_react.useMemo)(() => [plane], [plane]);
	const empty = (0, import_react.useMemo)(() => [], []);
	(0, import_react.useLayoutEffect)(() => {
		if (!enabled) {
			plane.normal.set(1, 0, 0);
			plane.constant = 1e5;
			return;
		}
		const maxY = booster ? 130 : 54;
		if (axis === "x") {
			plane.normal.set(1, 0, 0);
			plane.constant = -MathUtils.lerp(-6.2, 6.2, pos);
		} else if (axis === "z") {
			plane.normal.set(0, 0, 1);
			plane.constant = -MathUtils.lerp(-6.2, 6.2, pos);
		} else {
			plane.normal.set(0, 1, 0);
			plane.constant = -MathUtils.lerp(-2, maxY, pos);
		}
	}, [
		enabled,
		axis,
		pos,
		booster,
		plane
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MaterialsProvider, {
		planes: enabled ? planes : empty,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(World, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					altitude,
					0
				],
				children: [booster && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Booster, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					position: [
						0,
						booster ? BOOSTER.height : 0,
						0
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starship, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LaunchFX, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeasureGizmo, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionPlane, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionLabel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostFX, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .42 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
				position: [
					40,
					50,
					30
				],
				intensity: 1.35,
				color: "#f2f0ea"
			})
		]
	});
}
function Viewer() {
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
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
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh w-full overflow-hidden bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			shadows: true,
			dpr: [1, 1.75],
			gl: {
				antialias: true,
				localClippingEnabled: true,
				powerPreference: "high-performance"
			},
			camera: {
				position: [
					26,
					18,
					40
				],
				fov: 38,
				near: .12,
				far: 4500
			},
			onCreated: ({ gl }) => {
				gl.toneMapping = 4;
				gl.toneMappingExposure = 1.05;
				gl.localClippingEnabled = true;
			},
			onPointerMissed: () => {
				const s = useViewer.getState();
				if (s.measureMode) return;
				s.select(null);
			},
			style: { touchAction: "none" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneContent, {})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HUD, {})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewer, {});
}
//#endregion
export { Home as component };
