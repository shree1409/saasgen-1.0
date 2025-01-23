import { useState } from "react";
import SignInForm from "./SignInForm";
import PasswordChangeForm from "./PasswordChangeForm";

const AuthForm = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  return (
    <div className="space-y-4">
      {!isChangingPassword ? (
        <SignInForm onChangePasswordClick={() => setIsChangingPassword(true)} />
      ) : (
        <PasswordChangeForm onBackToSignIn={() => setIsChangingPassword(false)} />
      )}
    </div>
  );
};

export default AuthForm;