import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VideoInput from "./pages/VideoInput";
import Detection from "./pages/Detection";
import FeatureExtraction from "./pages/FeatureExtraction";
import Tracking from "./pages/Tracking";
import Results from "./pages/Results";
import Architecture from "./pages/Architecture";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/video-input" element={<VideoInput />} />
          <Route path="/detection" element={<Detection />} />
          <Route path="/features" element={<FeatureExtraction />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/results" element={<Results />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
