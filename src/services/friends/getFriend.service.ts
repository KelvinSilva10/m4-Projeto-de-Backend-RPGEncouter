import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import AppDataSource from "./../../data-source";

const getFriendService = async (userId: string) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({
    where: {
      id: userId,
    },
    relations: {
      friends: true,
    },
  });

  const friends = user.friends;
  // const verifyFriends = friends.find((elem) => elem.id === friendId);

  // if (!verifyFriends) {
  //   throw new AppError("friend not found", 403);
  // }

  return friends;
};

export default getFriendService;
