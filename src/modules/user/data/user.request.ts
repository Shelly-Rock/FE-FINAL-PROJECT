//param request
//body request
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
}