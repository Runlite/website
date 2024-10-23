import { ApiKey, Version } from "@/types/schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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
  baseURL: process.env.NEXT_PUBLIC_KEYS_SERVER+"/key",
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

export const getKeys = createAsyncThunk<ApiKey[], void>(
  "keys/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/get");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError).response?.data || "Failed to fetch keys"
      );
    }
  }
);

export const generateKey = createAsyncThunk<
  ApiKey,
  { name: string; desc: string; version: Version }
>("keys/generate", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/generate", data);
    return response.data;
  } catch (error) {
    return rejectWithValue(
      (error as AxiosError).response?.data || "Failed to generate key"
    );
  }
});

export const deleteKey = createAsyncThunk<string, string>(
  "keys/delete",
  async (keyId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/del/${keyId}`);
      return keyId;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError).response?.data || "Failed to delete key"
      );
    }
  }
);
