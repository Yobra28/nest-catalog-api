/* eslint-disable prettier/prettier */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  createBookDto?: T;
  error?: string;
}