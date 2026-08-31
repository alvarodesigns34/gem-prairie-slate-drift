/** 1 unit = 1 meter. SpaceX Block 2 ship + Super Heavy as published (spacex.com). */
export const R = 4.5;
export const RING = 1.83;

export const SHIP = {
  radius: R,
  height: 52.1,
  rings: 21,
  cylinderH: 21 * RING, // 38.43
  skirtH: 3 * RING, // 5.49 — engine bay
  loxH: 8 * RING, // 14.64
  ch4H: 7 * RING, // 12.81
  payloadH: 3 * RING, // 5.49
  noseH: 52.1 - 21 * RING, // 13.67
  ringH: RING,
  bellSl: 2.9,
  bellVac: 3.35,
} as const;

export const Y = {
  skirt0: 0,
  skirt1: 3 * RING, // 5.49
  lox1: 11 * RING, // 20.13
  ch41: 18 * RING, // 32.94
  pay1: 21 * RING, // 38.43
  nose1: 52.1,
} as const;

/** Super Heavy — 72 m (SpaceX), 9 m Ø, 33 Raptors. */
export const BOOSTER = {
  radius: R,
  height: 72,
  skirtH: 8,
  loxH: 32,
  ch4H: 28,
  hotStageH: 4,
  bell: 2.9,
} as const;

export const STACK_H = BOOSTER.height + SHIP.height; // 124.1 m

export const RAPTOR = {
  slExit: 1.3 / 2,
  slLen: 2.9,
  vacExit: 1.15,
  vacLen: 3.4,
  massKg: 1525,
  thrustSlTf: 250,
  thrustVacTf: 275,
} as const;

/**
 * Aft body flaps — ~180° apart, port/starboard, hinged on engine bay + LOX.
 * Photogrammetry: ~8.4 m along body, ~6.1 m span, tiled windward face.
 */
export const AFT_FLAP = {
  span: 6.05,
  root: 8.35,
  tip: 5.7,
  thick: 0.22,
  y: 7.55,
  standoff: 0.22,
  azPort: -Math.PI / 2,
  azStbd: Math.PI / 2,
} as const;

/**
 * Block 2 forward flaps — moved leeward, thinner, ~140° included angle.
 * Span ~4.7 m, root ~3.8 m. Hinges on payload/nose junction.
 */
export const FWD_FLAP = {
  span: 4.7,
  root: 3.75,
  tip: 1.85,
  thick: 0.12,
  y: 40.15,
  standoff: 0.16,
  /** radians from leeward (+Z) centerline */
  halfAngle: (70 * Math.PI) / 180,
} as const;

/** Block 2 Super Heavy grid fins: four, ~5.0 × 2.55 m, 45° clocking. */
export const GRID_FIN = {
  height: 5.0,
  width: 2.55,
  depth: 0.38,
  y: 61.2,
  standoff: 0.32,
} as const;

export const STEEL = "#b6bbc1";
export const STEEL_DARK = "#8e959c";
export const STEEL_SOOT = "#4e5358";
export const TILE = "#1c1e22";
export const TILE_VAR = "#26282d";
export const NOZZLE = "#6e5c4e";
export const NOZZLE_VAC = "#7a6758";
export const PUMP = "#8b929a";
export const GLASS = "#9eb4c8";
export const CRYO_LOX = "#c5d4e4";
export const CRYO_CH4 = "#d7cfc4";
export const STRUCTURE = "#3a3e44";
export const TITANIUM = "#b7b3aa";
