import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Lock, RefreshCw } from "lucide-react";
import AuthButton from "./AuthButton";
import AuthFormField from "./AuthFormField";

interface PasswordChangeFormProps {
  onBackToSignIn: () => void;
}

const PasswordChangeForm = ({ onBackToSignIn }: PasswordChangeFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please verify your current credentials",
        });
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({ 
        password: newPassword 
      });

      if (updateError) {
        toast({
          variant: "destructive",
          title: "Error changing password",
          description: updateError.message,
        });
      } else {
        toast({
          title: "Success",
          description: "Password changed successfully",
        });
        onBackToSignIn();
        setNewPassword("");
        setConfirmPassword("");
        setPassword("");
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
    <form onSubmit={handlePasswordChange} className="space-y-4">
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
        id="currentPassword"
        label="Current Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter current password"
        required
      />
      <AuthFormField
        id="newPassword"
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        required
      />
      <AuthFormField
        id="confirmPassword"
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new password"
        required
      />
      <div className="space-y-4">
        <AuthButton
          type="submit"
          loading={loading}
          icon={RefreshCw}
        >
          Change Password
        </AuthButton>
        <AuthButton
          variant="outline"
          onClick={onBackToSignIn}
          icon={Lock}
        >
          Back to Sign In
        </AuthButton>
      </div>
    </form>
  );
};

export default PasswordChangeForm;