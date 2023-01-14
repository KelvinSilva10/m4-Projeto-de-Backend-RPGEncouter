import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import Friend from "../../entities/friends.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";



const ensureUserAndFriendExists = async ( req: Request,res: Response, next: NextFunction) => {

    const userRepo = AppDataSource.getRepository(User)
    
    const nickFriend = await userRepo.findOneBy({ nick: req.body.nick })
    const user = await userRepo.findOneBy({id: req.params.id})

    const friendVerify = await userRepo.findOne({
        where: {
          id: user.id,
        },
        relations: {
          friends: true,
        },
      });
    
    const friends = friendVerify.friends;

    const verifyFriends = friends.find((elem) => elem.nick === req.body.nick);

      if (verifyFriends) {
        throw new AppError("friend alrealy add", 401);
    }
    
    if (!nickFriend){
        throw new AppError("Nick not found", 404)
    }

    if(!user){
        throw new AppError("User not found", 404)
    }

    next()
}

export default ensureUserAndFriendExists