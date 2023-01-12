import AppDataSource from "../../data-source";
import { Campaign } from "../../entities/campaign.entity";
import { AppError } from "../../errors/AppError";
import { ICampaignResponse } from "../../interfaces/campaign";

const listCampaignsService = async (): Promise<ICampaignResponse[]> => {
  const campaignRepo = AppDataSource.getRepository(Campaign);
  const listCampaign = await campaignRepo.find();

  return listCampaign;
};

export default listCampaignsService;
