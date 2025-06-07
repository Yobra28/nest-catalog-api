/* eslint-disable prettier/prettier */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  book?: T;    
  error?: string;
}
