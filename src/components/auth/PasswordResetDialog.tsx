import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordResetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PasswordResetDialog = ({ open, onOpenChange }: PasswordResetDialogProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    if (!email || !newPassword) {
      toast({
        title: "Error",
        description: "Please enter both email and new password.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        email: email,
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated. Please sign in with your new password.",
      });
      onOpenChange(false);
      setNewPassword("");
      setEmail("");
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Enter your email and new password to update your credentials.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button onClick={handleResetPassword} className="w-full">
            Update Password
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordResetDialog;