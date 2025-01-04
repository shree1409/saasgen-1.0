import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import GeneratedIdea from "./pages/GeneratedIdea";
import HowItWorks from "./pages/HowItWorks";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Generator from "./pages/Generator";
import Pricing from "./pages/Pricing";
import Basic from "./pages/Basic";
import Advanced from "./pages/Advanced";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/generator" 
              element={session ? <Generator /> : <Navigate to="/sign-in" />} 
            />
            <Route 
              path="/generated-idea" 
              element={session ? <GeneratedIdea /> : <Navigate to="/sign-in" />} 
            />
            <Route 
              path="/basic" 
              element={session ? <Basic /> : <Navigate to="/sign-in" />} 
            />
            <Route 
              path="/advanced" 
              element={session ? <Advanced /> : <Navigate to="/sign-in" />} 
            />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route 
              path="/sign-in" 
              element={session ? <Navigate to="/generator" /> : <SignIn />} 
            />
            <Route 
              path="/sign-up" 
              element={session ? <Navigate to="/generator" /> : <SignUp />} 
            />
            <Route 
              path="/profile" 
              element={session ? <Profile /> : <Navigate to="/sign-in" />} 
            />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;