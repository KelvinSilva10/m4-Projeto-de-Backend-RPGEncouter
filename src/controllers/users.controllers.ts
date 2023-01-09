import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { IUserRequest, IUserUpdateRequest } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();

  return res.json(users);
};

const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.params.id);
  return res.status(204).json({});
};

const updateUserController = async (req: Request, res: Response) => {
  const userData: IUserUpdateRequest = req.body;
  const userIdParams = req.params.id;
  const userId = String(req.user.id);
  const userIsAdm = req.user.isAdm;

  const updateUser = await updateUserService(
    userIdParams,
    userData,
    userId,
    userIsAdm
  );

  return res.json(updateUser);
};

export {
  createUserController,
  listUsersController,
  deleteUserController,
  updateUserController,
};
