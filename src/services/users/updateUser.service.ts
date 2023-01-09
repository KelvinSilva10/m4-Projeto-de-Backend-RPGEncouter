import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserUpdateRequest } from "../../interfaces/users";
import { userWithoutPasswordSerializer } from "../../serializers/user.schemas";

const updateUserService = async (
  userIdParams: string,
  userData: IUserUpdateRequest,
  userId: string,
  userIsAdm: boolean
) => {

  if (userId !== userIdParams && !userIsAdm) {
    throw new AppError("you must be an adm to update another user", 401);
  }
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: userIdParams,
  });


  const updateUser = userRepository.create({
    ...findUser,
    ...userData,
  });

  await userRepository.save(updateUser);

  const updatedUserWithoutPassword =
    await userWithoutPasswordSerializer.validate(updateUser, {
      stripUnknown: true,
    });

  return updatedUserWithoutPassword;
};

export default updateUserService;
