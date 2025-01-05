import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GeneratedIdea from "./pages/GeneratedIdea";
import HowItWorks from "./pages/HowItWorks";
import Generator from "./pages/Generator";
import Pricing from "./pages/Pricing";
import Basic from "./pages/Basic";
import Advanced from "./pages/Advanced";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/generated-idea" element={<GeneratedIdea />} />
            <Route path="/basic" element={<Basic />} />
            <Route path="/advanced" element={<Advanced />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;