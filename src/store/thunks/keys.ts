import axiosInstance from "@/lib/axiosInstance";
import { ApiKey, Version } from "@/types/schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const getKeys = createAsyncThunk<ApiKey[], void>(
  "keys/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/key/get");
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
    const response = await axiosInstance.post("/key/generate", data);
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
      await axiosInstance.delete(`/key/del/${keyId}`);
      return keyId;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError).response?.data || "Failed to delete key"
      );
    }
  }
);
