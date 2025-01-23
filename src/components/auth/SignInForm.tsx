import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Key, LogIn } from "lucide-react";
import AuthButton from "./AuthButton";
import AuthFormField from "./AuthFormField";

interface SignInFormProps {
  onChangePasswordClick: () => void;
}

const SignInForm = ({ onChangePasswordClick }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error signing in",
          description: error.message,
        });
      } else {
        toast({
          title: "Success",
          description: "Signed in successfully",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <AuthFormField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <AuthFormField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />
      <div className="space-y-4">
        <AuthButton
          type="submit"
          loading={loading}
          icon={LogIn}
        >
          Sign in
        </AuthButton>
        <AuthButton
          variant="outline"
          onClick={onChangePasswordClick}
          icon={Key}
        >
          Change Password
        </AuthButton>
      </div>
    </form>
  );
};

export default SignInForm;