import { Request, Response, NextFunction } from 'express'
import AppDataSource from "../../data-source"
import Character from '../../entities/character.entity'
import { AppError } from '../../errors/AppError'



const ensureCharacterAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {

    const characterRepo = AppDataSource.getRepository(Character)
    const character = await characterRepo.findOneBy({ id: req.params.id });

    if(!character.isActive){
        throw new AppError("Character is not active", 400)
    }

    next()
}

export default ensureCharacterAlreadyExists

