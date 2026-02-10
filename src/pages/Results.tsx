import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trackedObjects, trackingMetrics, performanceOverFrames } from "@/data/mockData";
import { Download, FileSpreadsheet, Video } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";

const Results = () => {
  const handleExportCSV = () => {
    let csv = "ObjectID,Label,FrameStart,FrameEnd,AvgConfidence\n";
    trackedObjects.forEach((obj) => {
      csv += `${obj.id},${obj.label},${obj.firstFrame},${obj.lastFrame},${obj.avgConfidence.toFixed(3)}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "tracking_results.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Results & Export</h1>
            <p className="text-sm text-muted-foreground mt-1">Final tracking results, performance metrics, and data export</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <FileSpreadsheet className="w-4 h-4 mr-1" /> Export CSV
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Video className="w-4 h-4 mr-1" /> Export Video
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["Total Objects", trackedObjects.length],
            ["Total Frames", trackingMetrics.totalFrames],
            ["MOTA Score", `${trackingMetrics.mota}%`],
            ["Processing Time", `${trackingMetrics.processingTime}s`],
          ].map(([label, value]) => (
            <Card key={String(label)} className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tracking Results Table */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-base">Tracking Results Summary</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground">Object ID</th>
                    <th className="text-left py-2 text-muted-foreground">Class</th>
                    <th className="text-left py-2 text-muted-foreground">First Frame</th>
                    <th className="text-left py-2 text-muted-foreground">Last Frame</th>
                    <th className="text-left py-2 text-muted-foreground">Track Length</th>
                    <th className="text-left py-2 text-muted-foreground">Avg Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {trackedObjects.map((obj) => (
                    <tr key={obj.id} className="border-b border-border/50">
                      <td className="py-2 font-mono text-xs" style={{ color: obj.color }}>{obj.id}</td>
                      <td className="py-2">{obj.label}</td>
                      <td className="py-2 font-mono text-xs">{obj.firstFrame}</td>
                      <td className="py-2 font-mono text-xs">{obj.lastFrame}</td>
                      <td className="py-2 font-mono text-xs">{obj.lastFrame - obj.firstFrame + 1}</td>
                      <td className="py-2 font-mono text-xs">{(obj.avgConfidence * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-base">Accuracy Over Frames</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[250px]">
                <AreaChart data={performanceOverFrames}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="frame" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} domain={[70, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="accuracy" stroke="hsl(199, 89%, 48%)" fill="hsl(199, 89%, 48%)" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-base">Processing Time (ms/frame)</CardTitle></CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[250px]">
                <LineChart data={performanceOverFrames}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="frame" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="processingTime" stroke="hsl(162, 63%, 41%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Results;
