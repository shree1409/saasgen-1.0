import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Generator from "@/pages/Generator";
import Basic from "@/pages/Basic";
import Advanced from "@/pages/Advanced";
import Pro from "@/pages/Pro";
import DemoBasic from "@/pages/DemoBasic";
import DemoAdvanced from "@/pages/DemoAdvanced";
import DemoPro from "@/pages/DemoPro";
import Profile from "@/pages/Profile";
import Dashboard from "@/pages/Dashboard";
import Pricing from "@/pages/Pricing";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/basic" element={<Basic />} />
        <Route path="/advanced" element={<Advanced />} />
        <Route path="/pro" element={<Pro />} />
        <Route path="/demo-basic" element={<DemoBasic />} />
        <Route path="/demo-advanced" element={<DemoAdvanced />} />
        <Route path="/demo-pro" element={<DemoPro />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
      <Toaster />
      <Sonner />
    </Router>
  );
}

export default App;