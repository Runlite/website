import axiosInstance from "@/lib/axiosInstance";
import { Logs, UsageRecord } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getApiUsage = createAsyncThunk<UsageRecord, void>(
  "usage/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<UsageRecord>("/usage/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError).response?.data || "Failed to fetch keys"
      );
    }
  }
);

export const getLogs = createAsyncThunk<Logs[], void>(
  "usage/logs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Logs[]>("/usage/logs");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError).response?.data || "Failed to fetch keys"
      );
    }
  }
);
