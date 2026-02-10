import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { references } from "@/data/mockData";
import { motion } from "framer-motion";
import { Video, ScanSearch, Layers, Route, FileBarChart, ArrowRight, BookOpen, Rocket } from "lucide-react";

const pipelineModules = [
  { label: "Video Input", icon: Video, color: "hsl(199, 89%, 48%)", tech: ["OpenCV", "FFmpeg"], desc: "Frame extraction, resize, noise reduction" },
  { label: "Object Detection", icon: ScanSearch, color: "hsl(162, 63%, 41%)", tech: ["YOLOv8", "PyTorch"], desc: "Real-time multi-class detection with NMS" },
  { label: "Feature Extraction", icon: Layers, color: "hsl(38, 92%, 50%)", tech: ["ResNet-50", "CNN"], desc: "Spatial + appearance + motion feature fusion" },
  { label: "Multi-Object Tracking", icon: Route, color: "hsl(270, 70%, 60%)", tech: ["Deep SORT", "Kalman Filter"], desc: "Hungarian algorithm, identity management" },
  { label: "Output & Export", icon: FileBarChart, color: "hsl(0, 84%, 60%)", tech: ["CSV", "Video"], desc: "Trajectory visualization, annotated video" },
];

const futureWork = [
  { title: "Transformer Temporal Modeling", desc: "Replace Kalman Filter with attention-based temporal modeling for better long-range tracking." },
  { title: "Cross-Camera Matching", desc: "Enable trajectory matching across multiple camera views using re-identification networks." },
  { title: "Edge Device Optimization", desc: "Model quantization and pruning for deployment on UAV embedded systems." },
  { title: "Self-Supervised Pre-training", desc: "Leverage unlabeled remote sensing data for improved feature representations." },
];

const Architecture = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">System Architecture</h1>
          <p className="text-sm text-muted-foreground mt-1">Modular pipeline design, technology stack, and research references</p>
        </div>

        {/* Pipeline Diagram */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-base">Pipeline Architecture</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pipelineModules.map((mod, i) => (
                <motion.div key={mod.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4">
                  <div className="w-8 text-center text-xs font-mono text-muted-foreground">{i + 1}</div>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${mod.color}20` }}>
                    <mod.icon className="w-5 h-5" style={{ color: mod.color }} />
                  </div>
                  <div className="flex-1 border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground text-sm">{mod.label}</h3>
                      <div className="flex gap-1">
                        {mod.tech.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{t}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{mod.desc}</p>
                  </div>
                  {i < pipelineModules.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-base">Technology Stack</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { cat: "Detection", items: ["YOLOv8", "PyTorch", "ONNX Runtime"] },
                { cat: "Tracking", items: ["Deep SORT", "ByteTrack", "Kalman Filter"] },
                { cat: "Features", items: ["ResNet-50", "FPN", "CNN Embeddings"] },
                { cat: "Infrastructure", items: ["OpenCV", "NumPy", "React Dashboard"] },
              ].map((group) => (
                <div key={group.cat}>
                  <h4 className="text-xs font-semibold text-primary mb-2">{group.cat}</h4>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item} className="text-xs text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* References */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><BookOpen className="w-4 h-4" /> Literature References</CardTitle></CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {references.map((ref) => (
                <li key={ref.id} className="text-sm">
                  <span className="text-muted-foreground mr-2">[{ref.id}]</span>
                  <span className="text-foreground font-medium">{ref.title}</span>
                  <span className="text-muted-foreground"> — {ref.authors}, {ref.venue}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Future Work */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Rocket className="w-4 h-4" /> Future Work Roadmap</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {futureWork.map((item, i) => (
                <div key={item.title} className="border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Architecture;
