import AppDataSource from "../../data-source";
import { Campaign } from "../../entities/campaign.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const deletePlayerCampaignService = async (
  idCampaign: string,
  idPlayer: string
) => {
  const campaignRepo = AppDataSource.getRepository(Campaign);
  const campaign = await campaignRepo.findOneBy({ id: idCampaign });

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: idPlayer });

  const campaignPlayers = campaign.campaignPlayers;
  const filterPlayers = campaignPlayers.filter((elem) => elem.id !== user.id);

  campaign.campaignPlayers = filterPlayers;
  await campaignRepo.save(campaign);

  return campaign;
};

export default deletePlayerCampaignService;
