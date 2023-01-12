import AppDataSource from "../../data-source";
import { Campaign } from "../../entities/campaign.entity";
import { User } from "../../entities/user.entity";
import { UserCampaign } from "../../entities/userCampaign.entity";
import { AppError } from "../../errors/AppError";
import { ICampaignRequest } from "../../interfaces/campaign";
import campaignRoutes from "./../../routes/campaigns.routes";

const newPlayerCampaignService = async (
  idCampaign: string,
  idUserPlayer: string
): Promise<{}> => {
  //CÓDIGO AQUI

  const campaignRepo = AppDataSource.getRepository(Campaign);
  const userRepo = AppDataSource.getRepository(User);
  const userCampaignRepo = AppDataSource.getRepository(UserCampaign);

  const user = await userRepo.findOneBy({ id: idUserPlayer });
  const campaign = await campaignRepo.findOneBy({ id: idCampaign });
  const userCampaign = userCampaignRepo.create({
    user: user,
    campaign: campaign,
    isOwner: false,
  });

  await userCampaignRepo.save(userCampaign);

  return { message: " player add " };
};

export default newPlayerCampaignService;
