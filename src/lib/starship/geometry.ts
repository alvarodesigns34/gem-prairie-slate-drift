import * as THREE from "three";
import { AFT_FLAP, FWD_FLAP, R, RAPTOR, SHIP } from "./constants";

function rng(seed: number) {
  return function next() {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createNoseGeometry() {
  const pts: THREE.Vector2[] = [];
  const H = SHIP.noseH;
  for (let i = 0; i <= 64; i++) {
    const t = i / 64;
    const y = H * (1 - t);
    const x = R * Math.pow(Math.sin((t * Math.PI) / 2), 0.7);
    pts.push(new THREE.Vector2(Math.max(0.09, x), y));
  }
  return new THREE.LatheGeometry(pts, 80);
}

export function createBellGeometry(exitR: number, length: number, throat = 0.16) {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= 36; i++) {
    const t = i / 36;
    const r = throat + (exitR - throat) * Math.pow(t, 0.6);
    pts.push(new THREE.Vector2(r, -t * length));
  }
  return new THREE.LatheGeometry(pts, 36);
}

function extrudeFlap(shape: THREE.Shape, thick: number) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: thick,
    bevelEnabled: true,
    bevelThickness: thick * 0.12,
    bevelSize: thick * 0.08,
    bevelSegments: 2,
  });
  g.translate(0, 0, -thick / 2);
  g.computeVertexNormals();
  return g;
}

/** Aft body flap — tall trapezoid, rounded tip, hinge on X=0. */
export function createAftFlapGeometry(thick: number = AFT_FLAP.thick) {
  const { span, root, tip } = AFT_FLAP;
  const s = new THREE.Shape();
  s.moveTo(0.04, -root / 2);
  s.lineTo(span * 0.16, -root / 2 + 0.04);
  s.lineTo(span - 0.12, -tip / 2 + 0.08);
  s.quadraticCurveTo(span + 0.08, 0, span - 0.1, tip / 2 - 0.15);
  s.lineTo(span * 0.2, root / 2 - 0.05);
  s.lineTo(0.04, root / 2);
  s.closePath();
  return extrudeFlap(s, thick);
}

/** Block 2 forward flap — smaller, swept, leeward canard. */
export function createFwdFlapGeometry(thick: number = FWD_FLAP.thick) {
  const { span, root, tip } = FWD_FLAP;
  const s = new THREE.Shape();
  s.moveTo(0.03, -root / 2);
  s.lineTo(span * 0.28, -root / 2 + 0.04);
  s.lineTo(span, -tip / 2);
  s.lineTo(span * 0.62, tip / 2);
  s.lineTo(span * 0.1, root / 2);
  s.lineTo(0.03, root / 2);
  s.closePath();
  return extrudeFlap(s, thick);
}

export function ringPositions(count: number, radius: number, phase = 0): [number, number][] {
  return Array.from({ length: count }, (_, i) => {
    const a = phase + (i / count) * Math.PI * 2;
    return [Math.sin(a) * radius, Math.cos(a) * radius];
  });
}

export const SHIP_SL = ringPositions(3, 1.48, 0);
export const SHIP_VAC = ringPositions(3, 3.08, Math.PI / 3);
export const BOOSTER_ENGINES = [
  ...ringPositions(3, 1.05, 0),
  ...ringPositions(10, 2.48, 0.1),
  ...ringPositions(20, 3.82, 0),
];

function canvasTex(c: HTMLCanvasElement, repeatU: number, repeatV: number) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeatU, repeatV);
  t.anisotropy = 8;
  t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

/** 304L mill-finish stainless — circumferential grain + ring welds. */
export function makeSteelMaps() {
  const n = rng(3041);
  const w = 512;
  const h = 512;
  const albedo = document.createElement("canvas");
  albedo.width = w;
  albedo.height = h;
  const ctx = albedo.getContext("2d")!;
  ctx.fillStyle = "#b4b9be";
  ctx.fillRect(0, 0, w, h);

  for (let y = 0; y < h; y++) {
    const band = 0.94 + n() * 0.08;
    ctx.fillStyle = `rgba(255,255,255,${(band - 1) * 0.35 + 0.02})`;
    ctx.fillRect(0, y, w, 1);
  }
  for (let x = 0; x < w; x++) {
    const g = n() * 0.07;
    ctx.fillStyle = `rgba(20,24,28,${g})`;
    ctx.fillRect(x, 0, 1, h);
  }
  for (let i = 0; i < 14; i++) {
    const y = ((i + 0.5) / 14) * h;
    ctx.fillStyle = "rgba(70,76,82,0.28)";
    ctx.fillRect(0, y, w, 2);
    ctx.fillStyle = "rgba(210,214,218,0.18)";
    ctx.fillRect(0, y + 2, w, 1);
  }
  for (let i = 0; i < 2200; i++) {
    ctx.fillStyle = n() > 0.5 ? `rgba(255,255,255,${n() * 0.05})` : `rgba(30,32,36,${n() * 0.06})`;
    ctx.fillRect(n() * w, n() * h, 1 + n() * 2, 1);
  }

  const rough = document.createElement("canvas");
  rough.width = w;
  rough.height = h;
  const rctx = rough.getContext("2d")!;
  rctx.fillStyle = "#9a9a9a";
  rctx.fillRect(0, 0, w, h);
  for (let x = 0; x < w; x++) {
    const v = 140 + n() * 70;
    rctx.fillStyle = `rgb(${v},${v},${v})`;
    rctx.fillRect(x, 0, 1, h);
  }

  const bump = document.createElement("canvas");
  bump.width = w;
  bump.height = h;
  const bctx = bump.getContext("2d")!;
  bctx.fillStyle = "#808080";
  bctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 14; i++) {
    const y = ((i + 0.5) / 14) * h;
    bctx.fillStyle = "#b0b0b0";
    bctx.fillRect(0, y, w, 2);
  }
  for (let x = 0; x < w; x++) {
    const v = 118 + n() * 28;
    bctx.fillStyle = `rgba(${v},${v},${v},0.35)`;
    bctx.fillRect(x, 0, 1, h);
  }

  const map = canvasTex(albedo, 4, 18);
  const roughnessMap = canvasTex(rough, 4, 18);
  roughnessMap.colorSpace = THREE.NoColorSpace;
  const bumpMap = canvasTex(bump, 4, 18);
  bumpMap.colorSpace = THREE.NoColorSpace;
  return { map, roughnessMap, bumpMap };
}

/** Hexagonal TPS tiles with gaps (crunch-wrap). */
export function makeTileMaps() {
  const n = rng(18000);
  const w = 512;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#121316";
  ctx.fillRect(0, 0, w, h);

  const size = 18;
  const hexW = Math.sqrt(3) * size;
  const hexH = 2 * size;
  for (let row = -2; row < h / (hexH * 0.75) + 2; row++) {
    for (let col = -2; col < w / hexW + 2; col++) {
      const x = col * hexW + (row % 2 ? hexW / 2 : 0);
      const y = row * hexH * 0.75;
      const shade = 26 + Math.floor(n() * 14);
      ctx.fillStyle = `rgb(${shade},${shade + 1},${shade + 3})`;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 6 + (Math.PI / 3) * i;
        const px = x + (size - 1.4) * Math.cos(a);
        const py = y + (size - 1.4) * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    }
  }

  const bump = document.createElement("canvas");
  bump.width = w;
  bump.height = h;
  const bctx = bump.getContext("2d")!;
  bctx.fillStyle = "#303030";
  bctx.fillRect(0, 0, w, h);
  for (let row = -2; row < h / (hexH * 0.75) + 2; row++) {
    for (let col = -2; col < w / hexW + 2; col++) {
      const x = col * hexW + (row % 2 ? hexW / 2 : 0);
      const y = row * hexH * 0.75;
      bctx.fillStyle = "#c8c8c8";
      bctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 6 + (Math.PI / 3) * i;
        const px = x + (size - 1.8) * Math.cos(a);
        const py = y + (size - 1.8) * Math.sin(a);
        if (i === 0) bctx.moveTo(px, py);
        else bctx.lineTo(px, py);
      }
      bctx.closePath();
      bctx.fill();
    }
  }

  const map = canvasTex(c, 10, 28);
  const bumpMap = canvasTex(bump, 10, 28);
  bumpMap.colorSpace = THREE.NoColorSpace;
  return { map, bumpMap };
}

export function makeSootMap() {
  const n = rng(77);
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, "#8a8e93");
  g.addColorStop(0.35, "#5c6166");
  g.addColorStop(1, "#3a3d42");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 1800; i++) {
    ctx.fillStyle = `rgba(10,10,12,${n() * 0.12})`;
    ctx.fillRect(n() * 256, n() * 256, 1 + n() * 3, 1 + n() * 8);
  }
  return canvasTex(c, 3, 6);
}

export function makeNozzleMap() {
  const n = rng(42);
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#6e5c4e";
  ctx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 7) {
    ctx.fillStyle = `rgba(30,22,16,${0.15 + n() * 0.15})`;
    ctx.fillRect(0, y, 256, 2);
    ctx.fillStyle = `rgba(180,150,110,${0.08 + n() * 0.08})`;
    ctx.fillRect(0, y + 2, 256, 1);
  }
  return canvasTex(c, 1, 8);
}

export function makeBrushedTexture() {
  return makeSteelMaps().map;
}

export function makeConcreteTexture() {
  const n = rng(99);
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#6a6c6f";
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 9000; i++) {
    const k = n();
    ctx.fillStyle = k > 0.5 ? `rgba(255,255,255,${k * 0.06})` : `rgba(0,0,0,${(1 - k) * 0.1})`;
    ctx.fillRect(n() * 512, n() * 512, 1 + n() * 3, 1 + n() * 3);
  }
  for (let i = 0; i < 18; i++) {
    ctx.strokeStyle = `rgba(0,0,0,${0.08 + n() * 0.08})`;
    ctx.beginPath();
    ctx.moveTo(n() * 512, n() * 512);
    ctx.lineTo(n() * 512, n() * 512);
    ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(14, 14);
  t.anisotropy = 8;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function makeEarthTexture() {
  const w = 1024;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#e8eef4");
  g.addColorStop(0.08, "#1c4d86");
  g.addColorStop(0.5, "#0b356c");
  g.addColorStop(0.9, "#1c4d86");
  g.addColorStop(1, "#e8eef4");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const land = (draw: (ctx: CanvasRenderingContext2D) => void, color = "#3a6b3a") => {
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

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

export { RAPTOR };
