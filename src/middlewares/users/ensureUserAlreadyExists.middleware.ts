import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const ensureUserAlreadyExistsMiddleware = async ( req: Request,res: Response, next: NextFunction) => {
   
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email: req.body.email });

  if (user) {
    throw new AppError("User already exist", 401)
  };
  
  next();
  }

export default ensureUserAlreadyExistsMiddleware;
