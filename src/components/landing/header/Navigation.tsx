import { Link } from "react-router-dom";
import { Session } from "@supabase/supabase-js";

interface NavigationProps {
  session?: Session | null;
  scrollToFeatures?: () => void;
}

const Navigation = ({ session, scrollToFeatures }: NavigationProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link
        to="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        to="/pricing"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Pricing
      </Link>
      <Link
        to="/generator"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Generator
      </Link>
    </nav>
  );
};

export default Navigation;