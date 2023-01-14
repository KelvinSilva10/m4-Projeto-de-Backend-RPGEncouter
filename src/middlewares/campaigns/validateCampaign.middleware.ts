import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Campaign } from "../../entities/campaign.entity";
import { AppError } from "../../errors/AppError";

const validadeCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const campaignRepo = AppDataSource.getRepository(Campaign);

  const validate = require("uuid-validate");

  if (!validate(req.params.id)) {
    throw new AppError("Campaign not exist", 404);
  }

  const campaign = await campaignRepo.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!campaign) {
    throw new AppError("Campaign not exist", 404);
  }

  if (!campaign.isActive) {
    throw new AppError("Campaign is not active", 404);
  }

  next();
};

export default validadeCampaign;
