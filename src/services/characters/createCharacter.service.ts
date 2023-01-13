import { User } from "../../entities/user.entity";
import AppDataSource from "./../../data-source";
import Character from "./../../entities/character.entity";
import { ICharacterRequest } from "./../../interfaces/characters/index";

const createCharacterService = async (
  characterData: ICharacterRequest,
  userId: string
): Promise<Character> => {
  //CÓDIGO AQUI

  const characterRepo = AppDataSource.getRepository(Character);
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: userId });

  const createdCharacter = characterRepo.create({
    ...characterData,
    user: user,
  });
  await characterRepo.save(createdCharacter);

  return createdCharacter;
};

export default createCharacterService;
