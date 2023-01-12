import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import Character from "./../../entities/character.entity";

const deleteCharacterService = async (characterId: string, userId: string) => {
  const characterRepository = AppDataSource.getRepository(Character);
  const character = await characterRepository.findOneBy({ id: characterId });

  const findCharacter = await characterRepository.findOne({
    where: {
      id: characterId,
    },
    relations: {
      user: true,
    },
  });
  if (findCharacter.user.id !== userId) {
    throw new AppError("character must be yours", 409);
  }
  if (!character.isActive) {
    throw new AppError("user must be active", 400);
  }

  character.isActive = false;
  await characterRepository.save(character);
};

export default deleteCharacterService;
