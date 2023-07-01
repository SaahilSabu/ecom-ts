import { ApiError } from "./types/ApiError";

export const getError = (error: ApiError) => {
  return error.message && error.response.data.message
    ? error.response.data.message
    : error.message;
};
