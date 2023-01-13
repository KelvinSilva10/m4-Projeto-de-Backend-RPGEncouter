import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Campaign } from "../../entities/campaign.entity";
import { AppError } from "../../errors/AppError";

const validadeCampaign = async ( req: Request, res: Response, next: NextFunction) => {

    const campaignRepo = AppDataSource.getRepository(Campaign)

    const campaign = await campaignRepo.findOneBy({id: req.body.idCampaign})

    if (!campaign) {
        throw new AppError("Campaign already exist", 401)

    }

    if(!campaign.isActive){
        throw new AppError("Campaign is not active")
    }

    next()
}

export default validadeCampaign
   