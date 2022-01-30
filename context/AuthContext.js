import { createContext, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(supabase.auth.user());

  const loginUser = async (email, password) => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (user && !error) {
      setUser(user);
    } else {
      alert(
        error.message === 'Invalid login credentials'
          ? 'Usuario o contraseña inválidos'
          : ''
      );
    }
  };

  const logoutUser = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
