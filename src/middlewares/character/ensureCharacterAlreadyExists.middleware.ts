import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Character from "../../entities/character.entity";
import { AppError } from "../../errors/AppError";

const ensureCharacterAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const characterRepo = AppDataSource.getRepository(Character);
  const character = await characterRepo.findOneBy({ id: req.params.id });

  if (!character) {
    throw new AppError("character not found", 403);
  }

  return next();
};

export default ensureCharacterAlreadyExists;
