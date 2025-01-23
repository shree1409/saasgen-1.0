import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Key, LogIn } from "lucide-react";
import AuthButton from "./AuthButton";
import AuthFormField from "./AuthFormField";
import FormError from "@/components/form/FormError";

interface SignInFormProps {
  onChangePasswordClick: () => void;
}

const SignInForm = ({ onChangePasswordClick }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        if (signInError.message === "Invalid login credentials") {
          setError("Invalid email or password. Please try again.");
        } else {
          setError(signInError.message);
        }
        toast({
          variant: "destructive",
          title: "Error signing in",
          description: signInError.message,
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
      setError("An unexpected error occurred. Please try again.");
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
      {error && <FormError error={error} />}
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