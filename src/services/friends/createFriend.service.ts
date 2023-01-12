import Friend from "../../entities/friends.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import AppDataSource from "./../../data-source";
import Character from "./../../entities/character.entity";

const createFriendService = async (friendData, idUser): Promise<{}> => {
  //CÓDIGO AQUI
  //verificacao!

  const friendRepo = AppDataSource.getRepository(Friend);
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.findOneBy({ id: idUser });

  if (!user) {
    throw new AppError("user not found!", 403);
  }

  return;
};

export default createFriendService;
