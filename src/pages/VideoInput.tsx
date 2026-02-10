import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Upload, Image, Settings2 } from "lucide-react";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";

const VideoInput = () => {
  const [uploaded, setUploaded] = useState(false);
  const [resize, setResize] = useState([100]);
  const [noiseReduction, setNoiseReduction] = useState([30]);
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = useCallback(() => setUploaded(true), []);

  // Generate fake extracted frames
  const frames = Array.from({ length: 12 }, (_, i) => i);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Video Input Module</h1>
          <p className="text-sm text-muted-foreground mt-1">Upload satellite/UAV video and extract frames for processing</p>
        </div>

        {/* Upload Area */}
        <Card className="bg-card border-border">
          <CardContent className="p-8">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border"}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(); }}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground font-medium mb-1">Drop video file here or click to browse</p>
              <p className="text-xs text-muted-foreground mb-4">Supports MP4, AVI, MOV • Max 500MB</p>
              <Button onClick={handleUpload} variant="outline">
                Select File
              </Button>
            </div>
            {uploaded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/30 text-sm text-accent">
                ✓ satellite_uav_footage_2024.mp4 loaded — 120 frames extracted at 24 FPS
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Preprocessing Controls */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Settings2 className="w-4 h-4" /> Preprocessing Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Resize Scale</span>
                <span className="text-foreground font-medium">{resize[0]}%</span>
              </div>
              <Slider value={resize} onValueChange={setResize} min={25} max={100} step={5} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Noise Reduction</span>
                <span className="text-foreground font-medium">{noiseReduction[0]}%</span>
              </div>
              <Slider value={noiseReduction} onValueChange={setNoiseReduction} min={0} max={100} step={5} />
            </div>
          </CardContent>
        </Card>

        {/* Extracted Frames Grid */}
        {uploaded && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Image className="w-4 h-4" /> Extracted Frames</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {frames.map((f) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: f * 0.05 }}
                    className="aspect-video bg-secondary rounded-lg border border-border flex items-center justify-center relative overflow-hidden"
                  >
                    {/* Simulated satellite imagery pattern */}
                    <div className="absolute inset-0 opacity-30">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div key={i} className="absolute rounded-sm bg-primary/40" style={{
                          left: `${15 + Math.random() * 60}%`, top: `${15 + Math.random() * 60}%`,
                          width: `${8 + Math.random() * 15}%`, height: `${8 + Math.random() * 15}%`,
                        }} />
                      ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono z-10">F-{String(f + 1).padStart(3, "0")}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VideoInput;
