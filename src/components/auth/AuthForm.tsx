import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

const AuthForm = () => {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: 'rgb(147, 51, 234)',
              brandAccent: 'rgb(126, 34, 206)',
            },
          },
        },
        className: {
          container: 'w-full',
          button: 'w-full px-4 py-2 rounded-lg',
          input: 'rounded-lg px-4 py-2 bg-white/50',
          label: 'text-sm font-medium text-gray-700',
          message: 'text-sm text-red-600',
        },
      }}
      theme="light"
      providers={[]}
      redirectTo={`${window.location.origin}/dashboard`}
    />
  );
};

export default AuthForm;