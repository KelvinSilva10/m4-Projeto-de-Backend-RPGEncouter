import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest, IUserResponse } from "../../interfaces/users";
import { userWithoutPasswordSerializer } from "../../serializers/user.schemas";

const createUserService = async (
  userData: IUserRequest
): Promise<IUserResponse> => {
  console.log('chegou na criação do usuário');
  
  const userRepository = AppDataSource.getRepository(User);

  const createdUser = userRepository.create(userData);
  await userRepository.save(createdUser);

  const userWithoutPassord = await userWithoutPasswordSerializer.validate(
    createdUser,
    {
      stripUnknown: true,
    }
  );

  return userWithoutPassord
};

export default createUserService;
