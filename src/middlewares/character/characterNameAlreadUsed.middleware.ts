import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import Character from "./../../entities/character.entity";

const characterNameAlreadUsedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const characterRepo = AppDataSource.getRepository(Character);
  const nameCharacter: string = req.body.name;
  const character = await characterRepo.findOneBy({ name: nameCharacter });

  if (character) {
    throw new AppError("character name already used", 403);
  }

  return next();
};

export default characterNameAlreadUsedMiddleware;
