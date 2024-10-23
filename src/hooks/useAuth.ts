import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/index";
import { LogOut, githubSignIn, googleSignIn } from "../store/thunks/auth";
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const authState = useSelector((state: RootState) => state.auth);

  return {
    ...authState,
    logOut: () => dispatch(LogOut()),
    googleSignin: () => dispatch(googleSignIn()),
    dispatch,
    githubSignIn: () => dispatch(githubSignIn()),
  };
};
