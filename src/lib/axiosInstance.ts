import axios from "axios";
import { getAuth } from "firebase/auth";

const getFirebaseToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      return user.getIdToken();
    }
    throw new Error("User is not authenticated");
  };
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_KEYS_SERVER,
    headers: {
      "Content-Type": "application/json",
    },
  });
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        const token = await getFirebaseToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error("Failed to get Firebase token:", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  export default axiosInstance