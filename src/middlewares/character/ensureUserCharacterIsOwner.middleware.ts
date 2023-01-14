import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Character from "../../entities/character.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const ensureUserCharacterIsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const characterRepo = AppDataSource.getRepository(Character);

  const character = await characterRepo.findOneBy({ id: req.params.id });
  const findCharacter = await characterRepo.findOne({
    where: {
      id: req.params.id,
    },
    relations: {
      user: true,
    },
  });
  const userId: string = req.user.id;

  if (!character.isActive) {
    throw new AppError("character not found", 403);
  }

  if (findCharacter.user.id !== userId) {
    throw new AppError("character not found", 403);
  }

  return next();
};

export default ensureUserCharacterIsOwner;
