import { Request, Response, NextFunction } from 'express'
import { AppError } from '../../errors/AppError'
import AppDataSource from "../../data-source";
import { User } from '../../entities/user.entity';



const ensureUserIsActive = async (req: Request, res: Response, next: NextFunction) => {

    const userRepo = AppDataSource.getRepository(User)
    const findUser = await userRepo.findOneBy({email: req.body.email})

    console.log("-----",findUser);
    
    
    if(findUser.isActive === false){
        throw new AppError("User is not active", 400)
    }

    next()
}

export default ensureUserIsActive