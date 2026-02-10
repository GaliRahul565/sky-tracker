import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackedObjects } from "@/data/mockData";
import { motion } from "framer-motion";
import { MapPin, Eye, Move, Combine } from "lucide-react";

const featureTypes = [
  {
    title: "Spatial Features",
    icon: MapPin,
    color: "hsl(199, 89%, 48%)",
    desc: "Position coordinates and bounding box dimensions extracted from each detection.",
    details: ["Center (x, y) coordinates", "Bounding box width & height", "Aspect ratio", "Relative position in frame"],
  },
  {
    title: "Appearance Features",
    icon: Eye,
    color: "hsl(162, 63%, 41%)",
    desc: "CNN embeddings capturing visual appearance for re-identification across frames.",
    details: ["128-dim CNN embedding vector", "Color histogram features", "Texture descriptors", "ResNet-50 backbone"],
  },
  {
    title: "Motion Features",
    icon: Move,
    color: "hsl(38, 92%, 50%)",
    desc: "Velocity vectors and direction derived from Kalman Filter state estimation.",
    details: ["Velocity (vx, vy)", "Acceleration estimate", "Direction angle", "Kalman predicted state"],
  },
];

const FeatureExtraction = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Feature Extraction & Fusion</h1>
          <p className="text-sm text-muted-foreground mt-1">Multi-modal feature extraction and unified representation for robust tracking</p>
        </div>

        {/* Feature Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featureTypes.map((feat, i) => (
            <motion.div key={feat.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-card border-border h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${feat.color}20` }}>
                      <feat.icon className="w-4 h-4" style={{ color: feat.color }} />
                    </div>
                    {feat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{feat.desc}</p>
                  <ul className="space-y-1">
                    {feat.details.map((d) => (
                      <li key={d} className="text-xs text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: feat.color }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Fusion Visualization */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Combine className="w-4 h-4" /> Feature Fusion Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-4 py-6">
              {featureTypes.map((feat, i) => (
                <div key={feat.title} className="flex items-center gap-3">
                  <div className="border border-border rounded-lg px-4 py-3 text-center min-w-[100px]" style={{ borderColor: feat.color }}>
                    <feat.icon className="w-5 h-5 mx-auto mb-1" style={{ color: feat.color }} />
                    <span className="text-xs font-medium text-foreground">{feat.title.split(" ")[0]}</span>
                  </div>
                  {i < featureTypes.length - 1 && <span className="text-muted-foreground text-lg">+</span>}
                </div>
              ))}
              <span className="text-muted-foreground text-lg mx-2">→</span>
              <div className="border-2 border-primary rounded-lg px-6 py-3 text-center bg-primary/5">
                <Combine className="w-5 h-5 mx-auto mb-1 text-primary" />
                <span className="text-xs font-bold text-primary">Fused Vector</span>
                <p className="text-[10px] text-muted-foreground">256-dim</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Per-Object Feature Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Object Feature Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">ID</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Class</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Position</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Velocity</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Embedding Norm</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {trackedObjects.map((obj) => {
                    const lastPt = obj.trajectory[obj.trajectory.length - 1];
                    const prevPt = obj.trajectory[Math.max(0, obj.trajectory.length - 2)];
                    const vx = (lastPt.x - prevPt.x).toFixed(1);
                    const vy = (lastPt.y - prevPt.y).toFixed(1);
                    return (
                      <tr key={obj.id} className="border-b border-border/50">
                        <td className="py-2 font-mono text-xs" style={{ color: obj.color }}>{obj.id}</td>
                        <td className="py-2">{obj.label}</td>
                        <td className="py-2 font-mono text-xs">({lastPt.x.toFixed(1)}, {lastPt.y.toFixed(1)})</td>
                        <td className="py-2 font-mono text-xs">({vx}, {vy})</td>
                        <td className="py-2 font-mono text-xs">{(0.8 + Math.random() * 0.15).toFixed(3)}</td>
                        <td className="py-2 font-mono text-xs">{(obj.avgConfidence * 100).toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FeatureExtraction;
