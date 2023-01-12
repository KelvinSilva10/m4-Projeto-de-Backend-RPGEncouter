import AppDataSource from "../../data-source";
import Character from "./../../entities/character.entity";

const getCharacterService = async (id): Promise<{}> => {
  //CÓDIGO AQUI
  const characterRepo = AppDataSource.getRepository(Character);
  const listCharacter = await characterRepo.findOneBy({ id: id });

  return listCharacter;
};

export default getCharacterService;
