import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import GeneratedIdea from "./pages/GeneratedIdea";
import HowItWorks from "./pages/HowItWorks";
import Generator from "./pages/Generator";
import Pricing from "./pages/Pricing";
import Basic from "./pages/Basic";
import Advanced from "./pages/Advanced";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import DemoBasic from "./pages/DemoBasic";
import DemoAdvanced from "./pages/DemoAdvanced";
import DemoPro from "./pages/DemoPro";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Sample demo data
const demoIdea = {
  websiteName: "EcoSwap Marketplace",
  description: "A sustainable marketplace platform where users can trade, sell, or swap eco-friendly products and services within their local community.",
  keyFeatures: [
    "User-friendly product listing and search",
    "Secure in-app messaging system",
    "Eco-impact scoring system",
    "Local community groups and events",
    "Verified seller program"
  ],
  monetizationStrategy: [
    "Premium listing features for sellers",
    "Commission on successful transactions",
    "Featured product placement opportunities"
  ],
  techStack: "React, Node.js, MongoDB, AWS S3, Stripe API, Socket.io, Redux",
  timelineBreakdown: "Month 1-2: Core marketplace features and user authentication. Month 3-4: Messaging system and community features. Month 5-6: Payment integration and premium features.",
  marketPotential: "Growing demand for sustainable products with 25% YoY market growth. Target audience includes environmentally conscious consumers aged 25-45 in urban areas."
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/generated-idea" element={<GeneratedIdea />} />
            <Route path="/basic" element={<Basic />} />
            <Route path="/advanced" element={<Advanced />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/demo" element={<GeneratedIdea demoData={demoIdea} />} />
            <Route path="/demo/basic" element={<DemoBasic />} />
            <Route path="/demo/advanced" element={<DemoAdvanced />} />
            <Route path="/demo/pro" element={<DemoPro />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;