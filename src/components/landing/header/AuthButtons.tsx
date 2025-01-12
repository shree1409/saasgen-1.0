import { Button } from "@/components/ui/button";
import { ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AuthButtonsProps {
  session: any;
  handleGenerateIdea: () => void;
  handleSignOut: () => void;
}

const AuthButtons = ({ session, handleGenerateIdea, handleSignOut }: AuthButtonsProps) => {
  const navigate = useNavigate();

  return session ? (
    <div className="flex items-center gap-4">
      <Button 
        variant="default" 
        size="sm"
        className="text-white"
        onClick={handleGenerateIdea}
      >
        Generate Idea
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigate('/dashboard')}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => navigate('/sign-up')}
      >
        Sign Up
      </Button>
      <Button 
        variant="default" 
        size="sm"
        className="text-white"
        onClick={() => navigate('/sign-in')}
      >
        Sign In
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default AuthButtons;