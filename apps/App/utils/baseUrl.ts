import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

export const AI_SERVER_URL =
  Platform.OS === "android" ? "http://10.0.2.2:5050" : "http://localhost:5050";
