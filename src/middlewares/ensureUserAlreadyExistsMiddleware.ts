import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const ensureUserAlreadyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email: req.body.email });

  if (user) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  return next();
};

export default ensureUserAlreadyExistsMiddleware;
