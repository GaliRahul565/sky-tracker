// Mock tracking data for the dashboard

export interface DetectedObject {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  confidence: number;
  color: string;
}

export interface TrackingFrame {
  frameId: number;
  timestamp: number;
  objects: DetectedObject[];
}

export interface TrajectoryPoint {
  frameId: number;
  x: number;
  y: number;
}

export interface TrackedObject {
  id: string;
  label: string;
  color: string;
  trajectory: TrajectoryPoint[];
  avgConfidence: number;
  firstFrame: number;
  lastFrame: number;
}

const OBJECT_COLORS = [
  "hsl(199, 89%, 48%)",  // cyan
  "hsl(162, 63%, 41%)",  // green
  "hsl(38, 92%, 50%)",   // amber
  "hsl(0, 84%, 60%)",    // red
  "hsl(270, 70%, 60%)",  // purple
  "hsl(330, 80%, 55%)",  // pink
];

const LABELS = ["Vehicle", "Aircraft", "Ship", "Building", "Person"];

// Generate realistic trajectories
function generateTrajectory(startX: number, startY: number, frames: number, speed: number): TrajectoryPoint[] {
  const points: TrajectoryPoint[] = [];
  let x = startX, y = startY;
  let dx = (Math.random() - 0.5) * speed;
  let dy = (Math.random() - 0.5) * speed;
  for (let i = 0; i < frames; i++) {
    dx += (Math.random() - 0.5) * 0.5;
    dy += (Math.random() - 0.5) * 0.5;
    x = Math.max(5, Math.min(95, x + dx));
    y = Math.max(5, Math.min(95, y + dy));
    points.push({ frameId: i, x, y });
  }
  return points;
}

const TOTAL_FRAMES = 120;

export const trackedObjects: TrackedObject[] = [
  { id: "OBJ-001", label: "Vehicle", color: OBJECT_COLORS[0], trajectory: generateTrajectory(20, 30, TOTAL_FRAMES, 1.2), avgConfidence: 0.94, firstFrame: 0, lastFrame: 119 },
  { id: "OBJ-002", label: "Vehicle", color: OBJECT_COLORS[1], trajectory: generateTrajectory(70, 60, TOTAL_FRAMES, 0.8), avgConfidence: 0.91, firstFrame: 5, lastFrame: 115 },
  { id: "OBJ-003", label: "Aircraft", color: OBJECT_COLORS[2], trajectory: generateTrajectory(50, 20, TOTAL_FRAMES, 2.0), avgConfidence: 0.87, firstFrame: 10, lastFrame: 119 },
  { id: "OBJ-004", label: "Ship", color: OBJECT_COLORS[3], trajectory: generateTrajectory(30, 75, TOTAL_FRAMES, 0.5), avgConfidence: 0.92, firstFrame: 0, lastFrame: 100 },
  { id: "OBJ-005", label: "Vehicle", color: OBJECT_COLORS[4], trajectory: generateTrajectory(80, 40, TOTAL_FRAMES, 1.0), avgConfidence: 0.88, firstFrame: 20, lastFrame: 119 },
  { id: "OBJ-006", label: "Person", color: OBJECT_COLORS[5], trajectory: generateTrajectory(45, 55, TOTAL_FRAMES, 0.6), avgConfidence: 0.82, firstFrame: 15, lastFrame: 110 },
];

export function getFrameData(frameId: number): DetectedObject[] {
  return trackedObjects
    .filter(obj => frameId >= obj.firstFrame && frameId <= obj.lastFrame)
    .map(obj => {
      const point = obj.trajectory[frameId - obj.firstFrame] || obj.trajectory[0];
      return {
        id: obj.id,
        label: obj.label,
        x: point.x,
        y: point.y,
        w: 6 + Math.random() * 2,
        h: 4 + Math.random() * 2,
        confidence: obj.avgConfidence + (Math.random() - 0.5) * 0.08,
        color: obj.color,
      };
    });
}

export const TOTAL_FRAME_COUNT = TOTAL_FRAMES;

export const detectionStats = {
  totalDetections: 684,
  avgConfidence: 0.89,
  classDistribution: [
    { name: "Vehicle", count: 312, color: OBJECT_COLORS[0] },
    { name: "Aircraft", count: 98, color: OBJECT_COLORS[2] },
    { name: "Ship", count: 105, color: OBJECT_COLORS[3] },
    { name: "Building", count: 89, color: OBJECT_COLORS[1] },
    { name: "Person", count: 80, color: OBJECT_COLORS[5] },
  ],
};

export const trackingMetrics = {
  mota: 78.4,
  motp: 82.1,
  idSwitches: 3,
  trackContinuity: 96.2,
  fps: 24,
  totalFrames: TOTAL_FRAMES,
  processingTime: 4.8,
};

export const algorithmComparison = [
  { metric: "MOTA (%)", deepSort: 78.4, byteTrack: 81.2 },
  { metric: "MOTP (%)", deepSort: 82.1, byteTrack: 79.8 },
  { metric: "ID Switches", deepSort: 3, byteTrack: 2 },
  { metric: "FPS", deepSort: 24, byteTrack: 30 },
  { metric: "Track Continuity (%)", deepSort: 96.2, byteTrack: 97.1 },
];

export const performanceOverFrames = Array.from({ length: 12 }, (_, i) => ({
  frame: (i + 1) * 10,
  accuracy: 85 + Math.random() * 10,
  processingTime: 30 + Math.random() * 20,
  objectCount: 3 + Math.floor(Math.random() * 4),
}));

export const references = [
  { id: 1, title: "YOLOv8: Real-Time Object Detection", authors: "Ultralytics (2023)", venue: "arXiv" },
  { id: 2, title: "Simple Online and Realtime Tracking with a Deep Association Metric (Deep SORT)", authors: "Wojke, N., Bewley, A., Paulus, D. (2017)", venue: "IEEE ICIP" },
  { id: 3, title: "ByteTrack: Multi-Object Tracking by Associating Every Detection Box", authors: "Zhang, Y. et al. (2022)", venue: "ECCV" },
  { id: 4, title: "An Introduction to the Kalman Filter", authors: "Welch, G. & Bishop, G. (2006)", venue: "UNC Chapel Hill" },
  { id: 5, title: "Feature Pyramid Networks for Object Detection", authors: "Lin, T. et al. (2017)", venue: "CVPR" },
  { id: 6, title: "Remote Sensing Object Tracking with Deep Reinforcement Learning", authors: "Du, B. et al. (2021)", venue: "IEEE TGRS" },
];
