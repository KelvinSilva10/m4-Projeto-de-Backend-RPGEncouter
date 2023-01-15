import Friend from "../../entities/friends.entity";
import { User } from "../../entities/user.entity";
import AppDataSource from "./../../data-source";

const getFriendService = async (userId: string) => {
  const userRepo = AppDataSource.getRepository(User);
  const friendsRepo = AppDataSource.getRepository(Friend);

  const friends = await friendsRepo
    .createQueryBuilder("friends")
    // .innerJoinAndSelect("users.friends", "friends")
    .where("friends.user = :id", { id: userId })
    .andWhere("friends.isActive = true")
    .getMany();

  return friends;
};

export default getFriendService;
