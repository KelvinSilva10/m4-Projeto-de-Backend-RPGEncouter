import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import Character from "./../../entities/character.entity";

const deleteCharacterService = async (id: string) => {
  const characterRepository = AppDataSource.getRepository(Character);
  const character = await characterRepository.findOneBy({ id: id });

  if (!character.isActive) {
    throw new AppError("user must be active", 400);
  }

  character.isActive = false;
  await characterRepository.save(character);
};

export default deleteCharacterService;
