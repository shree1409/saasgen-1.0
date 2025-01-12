import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  session: any;
  scrollToFeatures: () => void;
}

const Navigation = ({ session, scrollToFeatures }: NavigationProps) => {
  const navigate = useNavigate();

  return (
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
      {!session && (
        <Button 
          variant="ghost"
          onClick={() => navigate('/pricing')}
          className="text-sm text-muted-foreground hover:text-primary"
        >
          Pricing
        </Button>
      )}
    </nav>
  );
};

export default Navigation;