import { TypeRole } from "../role/role.types";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: TypeRole;
  img?: string;
  google?: boolean;
}

export interface UpdateUserDto {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: TypeRole;
  img?: string;
  state?: boolean;
  google?: boolean;
}

export interface UserResponseDto {
  _id: string;
  name: string;
  email: string;
  img?: string;
  state: boolean;
  role: TypeRole;
  google: boolean;
}
