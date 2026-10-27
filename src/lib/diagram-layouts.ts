import type { DiagramKind } from '../data/content';

// Bounds include each illustration and its caption. Paths stay in the gutters.
export interface DiagramBox { x: number; y: number; w: number; h: number; }
interface Layout { width: number; height: number; boxes: DiagramBox[]; paths: string[]; }
const box = (x: number, y: number, w: number, h: number): DiagramBox => ({ x, y, w, h });
// A shorter overview for the homepage; detailed figures keep their full layout.
export const roomsOverview = {
  wide: { width: 960, height: 296,
    boxes: [box(0,32,216,240),box(248,32,216,240),box(496,32,216,240),box(744,32,216,240)],
    paths: ['M108 32V20Q108 8 120 8H592Q604 8 604 20V32','M464 112H496','M712 112H744'] },
  narrow: { width: 320, height: 488,
    boxes: [box(4,8,136,200),box(180,8,136,200),box(4,280,136,200),box(180,280,136,200)],
    paths: ['M48 208V280','M248 208V240Q248 248 240 248H104Q96 248 96 256V280','M140 336H180'] },
};
const sequence = {
  wide: { width: 960, height: 304,
    boxes: [box(0,24,216,256),box(248,24,216,256),box(496,24,216,256),box(744,24,216,256)],
    paths: ['M216 112H248','M464 112H496','M712 112H744'] },
  narrow: { width: 320, height: 488,
    boxes: [box(4,8,136,200),box(180,8,136,200),box(4,280,136,200),box(180,280,136,200)],
    paths: ['M140 64H180','M248 208V244Q248 252 240 252H80Q72 252 72 260V280','M140 336H180'] },
};
export const diagramLayouts: Record<DiagramKind, { wide: Layout; narrow: Layout }> = {
  'live-journey': {
    wide: { width: 1200, height: 328,
      boxes: [box(0,48,208,272),box(248,48,208,272),box(496,48,208,272),box(744,48,208,272),box(992,48,208,272)],
      paths: ['M104 48V24Q104 16 112 16H592Q600 16 600 24V48','M456 112H496','M704 112H744','M952 112H992'] },
    narrow: { width: 320, height: 784,
      boxes: [box(4,8,136,224),box(180,8,136,224),box(48,280,224,224),box(4,556,136,224),box(180,556,136,224)],
      paths: ['M72 232V248Q72 256 80 256H112Q120 256 120 264V280','M248 232V248Q248 256 240 256H208Q200 256 200 264V280','M160 504V524Q160 532 152 532H80Q72 532 72 540V556','M140 604H180'] },
  },
  rooms: {
    wide: { width: 960, height: 456,
      boxes: [box(8,0,248,208),box(8,240,248,208),box(328,96,304,272),box(704,108,248,256)],
      paths: ['M256 72H284Q296 72 296 84V156Q296 168 308 168H348','M256 304H284Q296 304 296 292V204Q296 192 308 192H348','M612 180H724'] },
    narrow: { width: 320, height: 648,
      boxes: [box(4,8,136,176),box(180,8,136,176),box(48,220,224,208),box(48,472,224,176)],
      paths: ['M72 184V196Q72 204 80 204H112Q120 204 120 212V228','M248 184V196Q248 204 240 204H208Q200 204 200 212V228','M160 428V472'] },
  },
  production: sequence,
  audience: {
    wide: { width: 960, height: 488,
      boxes: [box(8,0,288,232),box(664,0,288,232),box(336,252,288,232)],
      paths: ['M296 84H664','M808 232V316Q808 328 796 328H624','M336 328H164Q152 328 152 316V232'] },
    narrow: { width: 320, height: 484,
      boxes: [box(4,8,136,224),box(180,8,136,224),box(48,284,224,200)],
      paths: ['M140 64H180','M248 232V248Q248 256 240 256H208Q200 256 200 264V284','M48 340H24Q16 340 16 332V244Q16 236 24 236H64Q72 236 72 228V220'] },
  },
  workflow: sequence,
};
