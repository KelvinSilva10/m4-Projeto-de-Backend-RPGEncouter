import Friend from "../../entities/friends.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import AppDataSource from "./../../data-source";
import Character from "./../../entities/character.entity";
import { IFriendResponse } from "./../../interfaces/friends/friends.interfaces";

const createFriendService = async (
  nick: string,
  idUser: string
  // friendId: string
): Promise<IFriendResponse> => {
  const friendRepo = AppDataSource.getRepository(Friend);
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: idUser });
  const nikeUser = await userRepo.findOneBy({ nick: nick });

  if (!nikeUser) {
    throw new AppError("user not found", 403);
  }

  const friend = nikeUser.id;

  if (!user) {
    throw new AppError("user not found!", 403);
  }

  const newFriend = friendRepo.create({
    nick: nick,
    user: user,
    id: friend,
  });
  await friendRepo.save(newFriend);
  return newFriend;
};

export default createFriendService;
