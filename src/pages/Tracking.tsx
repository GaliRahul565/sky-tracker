import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { trackedObjects, trackingMetrics, algorithmComparison, TOTAL_FRAME_COUNT } from "@/data/mockData";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const Tracking = () => {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setFrame((f) => (f >= TOTAL_FRAME_COUNT - 1 ? 0 : f + 1));
      }, 80);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing]);

  // Draw trajectories on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = "hsl(222, 22%, 11%)";
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "hsl(220, 18%, 16%)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    trackedObjects.forEach((obj) => {
      const endIdx = Math.min(frame - obj.firstFrame, obj.trajectory.length - 1);
      if (endIdx < 0) return;

      // Draw trajectory line
      ctx.beginPath();
      ctx.strokeStyle = obj.color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;
      for (let i = Math.max(0, endIdx - 30); i <= endIdx; i++) {
        const pt = obj.trajectory[i];
        const px = (pt.x / 100) * w;
        const py = (pt.y / 100) * h;
        if (i === Math.max(0, endIdx - 30)) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Current position
      const current = obj.trajectory[endIdx];
      const cx = (current.x / 100) * w;
      const cy = (current.y / 100) * h;

      // Bounding box
      ctx.strokeStyle = obj.color;
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 15, cy - 10, 30, 20);

      // ID label
      ctx.fillStyle = obj.color;
      ctx.fillRect(cx - 15, cy - 22, 40, 12);
      ctx.fillStyle = "#fff";
      ctx.font = "9px monospace";
      ctx.fillText(obj.id, cx - 13, cy - 13);
    });
  }, [frame]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Multi-Object Tracking</h1>
          <p className="text-sm text-muted-foreground mt-1">Deep SORT / ByteTrack with Kalman Filter prediction and identity management</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tracking Canvas */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Tracking View — Frame {frame + 1}/{TOTAL_FRAME_COUNT}</CardTitle>
            </CardHeader>
            <CardContent>
              <canvas ref={canvasRef} width={640} height={400} className="w-full rounded-lg border border-border mb-4" />
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => setFrame(Math.max(0, frame - 1))}><SkipBack className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => setPlaying(!playing)}>
                  {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setFrame(Math.min(TOTAL_FRAME_COUNT - 1, frame + 1))}><SkipForward className="w-4 h-4" /></Button>
                <div className="flex-1">
                  <Slider value={[frame]} onValueChange={([v]) => setFrame(v)} min={0} max={TOTAL_FRAME_COUNT - 1} step={1} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics */}
          <div className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-base">Tracking Metrics</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  ["MOTA", `${trackingMetrics.mota}%`],
                  ["MOTP", `${trackingMetrics.motp}%`],
                  ["ID Switches", `${trackingMetrics.idSwitches}`],
                  ["Track Continuity", `${trackingMetrics.trackContinuity}%`],
                  ["Processing FPS", `${trackingMetrics.fps}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-bold text-foreground">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Identity Table */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-base">Active Tracks</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {trackedObjects.map((obj) => {
                    const active = frame >= obj.firstFrame && frame <= obj.lastFrame;
                    return (
                      <div key={obj.id} className={`flex items-center gap-2 text-xs py-1 px-2 rounded ${active ? "bg-secondary/50" : "opacity-40"}`}>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: obj.color }} />
                        <span className="font-mono text-foreground">{obj.id}</span>
                        <span className="text-muted-foreground">{obj.label}</span>
                        <span className="ml-auto text-muted-foreground">{active ? "Active" : "Lost"}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Algorithm Comparison */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-base">Algorithm Comparison: Deep SORT vs ByteTrack</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground">Metric</th>
                    <th className="text-center py-2 text-primary font-medium">Deep SORT</th>
                    <th className="text-center py-2 text-accent font-medium">ByteTrack</th>
                  </tr>
                </thead>
                <tbody>
                  {algorithmComparison.map((row) => (
                    <tr key={row.metric} className="border-b border-border/50">
                      <td className="py-2 text-foreground">{row.metric}</td>
                      <td className="py-2 text-center font-mono">{row.deepSort}</td>
                      <td className="py-2 text-center font-mono">{row.byteTrack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Tracking;
