import { User } from "./User";

export interface LoginResponse {
  success: boolean;
  user: User | null;
  errorMessage: string;
}
