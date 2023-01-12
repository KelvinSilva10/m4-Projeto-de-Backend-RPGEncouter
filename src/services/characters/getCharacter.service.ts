import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import Character from "./../../entities/character.entity";

const getCharacterService = async (
  userId: string,
  characterId: string
): Promise<{}> => {
  //CÓDIGO AQUI
  const characterRepo = AppDataSource.getRepository(Character);

  const character = await characterRepo.findOneBy({ id: characterId });

  const findCharacter = await characterRepo.findOne({
    where: {
      id: characterId,
    },
    relations: {
      user: true,
    },
  });

  if (!character.isActive) {
    throw new AppError("character not found", 404);
  }

  if (findCharacter.user.id !== userId) {
    throw new AppError("character must be yours", 409);
  }
  return character;
};

export default getCharacterService;
