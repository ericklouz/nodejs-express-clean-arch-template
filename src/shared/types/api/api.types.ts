export interface ErrorResponse {
  type: string;
  message: string;
}

export interface ApiResponse<T> {
  status: number;
  data: T | T[] | null;
  message?: string;
  error?: ErrorResponse;
}
