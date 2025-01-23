import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface AuthButtonProps {
  type?: "submit" | "button";
  variant?: "default" | "outline";
  loading?: boolean;
  onClick?: () => void;
  icon?: LucideIcon;
  children: React.ReactNode;
}

const AuthButton = ({
  type = "button",
  variant = "default",
  loading = false,
  onClick,
  icon: Icon,
  children,
}: AuthButtonProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      className={`w-full ${variant === "default" ? "bg-primary text-white hover:bg-primary/90" : ""}`}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? (
        "Loading..."
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 mr-2" />}
          {children}
        </>
      )}
    </Button>
  );
};

export default AuthButton;