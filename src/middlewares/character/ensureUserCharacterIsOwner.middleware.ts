import { Request, Response, NextFunction } from 'express'
import AppDataSource from "../../data-source"
import Character from '../../entities/character.entity'
import { User } from '../../entities/user.entity'
import { AppError } from '../../errors/AppError'



const ensureUserCharacterIsOwner = async (req: Request, res: Response, next: NextFunction) => {

    const userRepo  = AppDataSource.getRepository(User)

    const userId = await userRepo.findOneBy({id: req.user.id})

    if(!userId){
        throw new AppError("Character must be yours", 400)
    }

    next()
}

export default ensureUserCharacterIsOwner

