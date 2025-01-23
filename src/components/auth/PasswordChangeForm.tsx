import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Lock, RefreshCw } from "lucide-react";

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
      // First, sign in with current credentials
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

      // Then update the password
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
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter current password"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
        />
      </div>
      <div className="space-y-4">
        <Button
          type="submit"
          className="w-full bg-primary text-white hover:bg-primary/90"
          disabled={loading}
        >
          {loading ? (
            "Changing Password..."
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Change Password
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onBackToSignIn}
        >
          <Lock className="w-4 h-4 mr-2" />
          Back to Sign In
        </Button>
      </div>
    </form>
  );
};

export default PasswordChangeForm;