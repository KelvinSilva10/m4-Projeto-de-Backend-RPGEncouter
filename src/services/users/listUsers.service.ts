import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUser, IUserResponse } from "../../interfaces/users";

const listUsersService = async (): Promise<IUserResponse[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const usersNotPassword = users.map((user) => {
    const { password, ...notPassWord } = user;
    return notPassWord;
  });

  return usersNotPassword;
};

export default listUsersService;
