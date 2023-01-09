export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

export interface IUserResponse {
  name: string;
  email: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isAdm: boolean;
  isActive: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
}
