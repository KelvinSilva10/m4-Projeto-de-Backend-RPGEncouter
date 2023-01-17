import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import Character from "./../../entities/character.entity";

const getCharacterAllService = async (userId: string): Promise<Character[]> => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({
    where: {
      id: userId,
    },
    relations: {
      character: true,
    },
  });

  if (!user.isActive) {
    throw new AppError("user not found", 403);
  }
  const character = user.character;
  if (!character) {
    throw new AppError("usuario without history of characters", 409);
  }

  return character;
};
export default getCharacterAllService;
