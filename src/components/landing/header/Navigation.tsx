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
        to="/pricing"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Pricing
      </Link>
      {scrollToFeatures && (
        <button
          onClick={scrollToFeatures}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Features
        </button>
      )}
      {session ? (
        <Link
          to="/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Dashboard
        </Link>
      ) : null}
    </nav>
  );
};

export default Navigation;