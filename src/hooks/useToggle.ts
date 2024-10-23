import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
export const useToggle = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toogleStore = useSelector((state: RootState) => state.toggle);
  return {
    ...toogleStore,
    dispatch,
  };
};
