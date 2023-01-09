import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import validate from "uuid-validate";
import { AppError } from "../errors/AppError";

const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!validate(req.params.id)) {
    return res.status(404).json({
      message: "user not exist !",
    });
  }
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: req.params.id,
  });

  if (!findUser) {
    return res.status(404).json({
      message: "user not exist !",
    });
  }

  return next();
};

export default ensureUserExistsMiddleware;
