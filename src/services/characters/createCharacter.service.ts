import AppDataSource from "./../../data-source";
import Character from "./../../entities/character.entity";

const createCharacterService = async (userData): Promise<{}> => {
  //CÓDIGO AQUI

  const characterRepo = AppDataSource.getRepository(Character);

  const campaign = characterRepo.create(userData);

  await characterRepo.save(campaign);
  return campaign;
};

export default createCharacterService;
