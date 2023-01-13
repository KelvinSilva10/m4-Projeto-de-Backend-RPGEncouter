import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserUpdateRequest } from "../../interfaces/users";
import { userWithoutPasswordSerializer } from "../../serializers/user.schemas";

const updateUserService = async (
  userIdParams: string,
  userData: IUserUpdateRequest,
  userId: string
) => {
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
