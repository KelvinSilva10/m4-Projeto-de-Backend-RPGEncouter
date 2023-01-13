import AppDataSource from "../../data-source";
import { Campaign } from "../../entities/campaign.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const deleteCampaignService = async (id: string) => {
  const campaignRepo = AppDataSource.getRepository(Campaign);
  const campaign = await campaignRepo.findOneBy({ id: id });

  if (!campaign) {
    throw new AppError("camapaign not found", 403);
  }
  if (!campaign.isActive) {
    throw new AppError("campaign not found", 403);
  }

  campaign.isActive = false;

  await campaignRepo.save(campaign);
};

export default deleteCampaignService;
