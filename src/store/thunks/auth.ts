import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
export const googleSignIn = createAsyncThunk("auth/signin", async () => {
  try {
    const googleAuth = new GoogleAuthProvider();
    await signInWithPopup(auth, googleAuth);
  } catch (error) {
    console.log("Error signing in", (error as Error).message);
  }
});

export const LogOut = createAsyncThunk("auth/signout", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Error signing out", (error as Error).message);
  }
});

export const githubSignIn = createAsyncThunk("auth/github", async () => {
  try {
    const githubAuth = new GithubAuthProvider();
    await signInWithPopup(auth, githubAuth);
  } catch (error) {
    console.log("Error signing in with github", (error as Error).message);
  }
});
