import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const scrollToFeatures = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToFeatures: true } });
    } else {
      const featuresSection = document.getElementById('features');
      featuresSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Logo />
          <span className="font-semibold text-lg">SaasGen</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Button 
            variant="ghost"
            onClick={scrollToFeatures}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Features
          </Button>
          <Button 
            variant="ghost"
            onClick={() => navigate('/how-it-works')}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            How it Works
          </Button>
          <Button 
            variant="ghost"
            onClick={() => navigate('/pricing')}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Pricing
          </Button>
        </nav>
        <div className="flex items-center gap-4">
          <Button 
            variant="default" 
            size="sm"
            className="text-white"
            onClick={() => navigate('/generator')}
          >
            Generate Idea
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;