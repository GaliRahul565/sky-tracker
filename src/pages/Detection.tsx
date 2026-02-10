import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFrameData, detectionStats, TOTAL_FRAME_COUNT } from "@/data/mockData";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";

const Detection = () => {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const objects = getFrameData(frame);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setFrame((f) => (f >= TOTAL_FRAME_COUNT - 1 ? 0 : f + 1));
      }, 100);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Object Detection Module</h1>
          <p className="text-sm text-muted-foreground mt-1">YOLO-based detection with bounding boxes and confidence scores</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Detection Canvas */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Detection View — Frame {frame + 1}/{TOTAL_FRAME_COUNT}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-secondary rounded-lg border border-border overflow-hidden mb-4">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{ background: "repeating-conic-gradient(hsl(var(--muted)) 0% 25%, transparent 0% 50%) 0 0 / 20px 20px" }} />
                </div>
                {/* Bounding boxes */}
                {objects.map((obj) => (
                  <div key={obj.id} className="absolute border-2 rounded-sm transition-all duration-100" style={{
                    left: `${obj.x - obj.w / 2}%`, top: `${obj.y - obj.h / 2}%`,
                    width: `${obj.w}%`, height: `${obj.h}%`,
                    borderColor: obj.color,
                  }}>
                    <span className="absolute -top-5 left-0 text-[9px] font-mono px-1 rounded" style={{ backgroundColor: obj.color, color: "#fff" }}>
                      {obj.label} {(obj.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
              {/* Playback Controls */}
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

          {/* Stats Panel */}
          <div className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-base">Detection Stats</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Detections</span>
                  <span className="font-bold text-foreground">{detectionStats.totalDetections}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg Confidence</span>
                  <span className="font-bold text-foreground">{(detectionStats.avgConfidence * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Frame Objects</span>
                  <span className="font-bold text-foreground">{objects.length}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-base">Class Distribution</CardTitle></CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[200px]">
                  <BarChart data={detectionStats.classDistribution} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={60} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" radius={4}>
                      {detectionStats.classDistribution.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Detection;
