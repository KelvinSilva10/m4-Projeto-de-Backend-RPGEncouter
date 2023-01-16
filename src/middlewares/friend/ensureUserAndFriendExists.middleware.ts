import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const ensureNickExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User);
  const friend = await userRepo.findOneBy({ nick: req.body.nick });

  if (!friend) {
    throw new AppError("Nick not found", 404);
  }

  if (!friend.isActive) {
    throw new AppError("User is not active", 404);
  }

  // const verifyFriends = user.friends.find(
  //   (friends) => friends.nick === friend.nick
  // );

  // if (verifyFriends) {
  //   throw new AppError("You are already friends", 409);
  // }

  next();
};

export default ensureNickExistsMiddleware;
