import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

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
    <header className="container px-4 py-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img 
          src="/logo.png" 
          alt="SaasGen Logo" 
          className="w-8 h-8 object-contain"
        />
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
        <a href="#generator" className="text-sm text-muted-foreground hover:text-primary">Generator</a>
      </nav>
      <Button 
        variant="default" 
        size="sm"
        className="text-white"
        onClick={() => navigate('#generator')}
      >
        Get Started
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </header>
  );
};

export default Header;