"use client";

import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { setAuth, clearAuth, setLoading } from "../store/slices/auth.slice";

interface AuthProviderProps {
  children: React.ReactNode;
}
// handle auth state using firebase
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { dispatch } = useAuth();

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          dispatch(setAuth(user));
        } else {
          dispatch(clearAuth());
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        dispatch(clearAuth());
      } finally {
        dispatch(setLoading(false));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};
