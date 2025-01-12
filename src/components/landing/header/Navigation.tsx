import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Info, List } from "lucide-react";

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
        className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2"
      >
        <List className="w-4 h-4" />
        Features
      </Button>
      <Button 
        variant="ghost"
        onClick={() => navigate('/how-it-works')}
        className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2"
      >
        <Info className="w-4 h-4" />
        How it Works
      </Button>
    </nav>
  );
};

export default Navigation;