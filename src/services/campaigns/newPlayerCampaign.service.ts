import AppDataSource from "../../data-source";
import { Campaign } from "../../entities/campaign.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { ICampaignRequest } from "../../interfaces/campaign";
import campaignRoutes from "./../../routes/campaigns.routes";

const newPlayerCampaignService = async (
  idCampaign: string,
  idUserPlayer: string
) => {
  //CÓDIGO AQUI

  const campaignRepo = AppDataSource.getRepository(Campaign);
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: idUserPlayer });

  const campaign = await campaignRepo.findOneBy({ id: idCampaign });
  if (!campaign) {
    throw new AppError("campaign not found", 403);
  }
  if (!user) {
    throw new AppError("user not found", 403);
  }

  const newUser = campaignRepo.create({
    ...campaign.campaignPlayers,
    ...user,
  });

  return newUser;
};

export default newPlayerCampaignService;
