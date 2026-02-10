import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackingMetrics, detectionStats } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Video, ScanSearch, Layers, Route, FileBarChart, Network, ArrowRight, Activity, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

const pipelineSteps = [
  { label: "Video Input", icon: Video, desc: "Frame extraction & preprocessing" },
  { label: "Detection", icon: ScanSearch, desc: "YOLO-based object detection" },
  { label: "Features", icon: Layers, desc: "Spatial + appearance + motion" },
  { label: "Tracking", icon: Route, desc: "Deep SORT / ByteTrack" },
  { label: "Output", icon: FileBarChart, desc: "Trajectories & export" },
];

const moduleCards = [
  { title: "Video Input", desc: "Upload and preprocess satellite/UAV video", icon: Video, path: "/video-input", color: "hsl(199, 89%, 48%)" },
  { title: "Object Detection", desc: "YOLO-based real-time detection", icon: ScanSearch, path: "/detection", color: "hsl(162, 63%, 41%)" },
  { title: "Feature Extraction", desc: "Multi-feature fusion pipeline", icon: Layers, path: "/features", color: "hsl(38, 92%, 50%)" },
  { title: "Multi-Object Tracking", desc: "Identity-consistent tracking", icon: Route, path: "/tracking", color: "hsl(270, 70%, 60%)" },
  { title: "Results & Export", desc: "Visualization and data export", icon: FileBarChart, path: "/results", color: "hsl(0, 84%, 60%)" },
  { title: "System Architecture", desc: "Pipeline design & references", icon: Network, path: "/architecture", color: "hsl(330, 80%, 55%)" },
];

const metrics = [
  { label: "Objects Tracked", value: "6", icon: Target },
  { label: "Frames Processed", value: `${trackingMetrics.totalFrames}`, icon: Activity },
  { label: "MOTA Score", value: `${trackingMetrics.mota}%`, icon: Zap },
  { label: "Detections", value: `${detectionStats.totalDetections}`, icon: ScanSearch },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-foreground mb-2">Remote Sensing Video Tracking</h1>
          <p className="text-muted-foreground max-w-2xl">
            A modular tracking-by-detection framework for satellite and UAV video analysis using deep learning.
            Automatically detect and track multiple objects across video frames with identity consistency.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-card border-border">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <m.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{m.value}</p>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pipeline Diagram */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">System Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {pipelineSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg bg-secondary/50 border border-border min-w-[120px]">
                    <step.icon className="w-5 h-5 text-primary" />
                    <span className="text-xs font-semibold text-foreground">{step.label}</span>
                    <span className="text-[10px] text-muted-foreground text-center">{step.desc}</span>
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Module Cards */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Explore Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {moduleCards.map((mod, i) => (
              <motion.div key={mod.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}>
                <Link to={mod.path}>
                  <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer group h-full">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${mod.color}20` }}>
                        <mod.icon className="w-5 h-5" style={{ color: mod.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{mod.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{mod.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
