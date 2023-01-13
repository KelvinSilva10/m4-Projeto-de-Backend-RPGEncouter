import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const deleteUserService = async (id: string) => {
 
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: id });

  if (!user.isActive) {
    throw new AppError("user must be active", 400);
  }

  user.isActive = false;
  await userRepository.save(user);
  return {};
};

export default deleteUserService;
