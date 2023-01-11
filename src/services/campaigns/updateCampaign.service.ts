import AppDataSource from "../../data-source";
import { Campaign } from "../../entities/campaign.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { ICampaignRequest } from "../../interfaces/campaign";

const updateCampaignService = async (
  campaignIdParams: string,
  campaignData: ICampaignRequest,
  userId: string
) => {
  //CÓDIGO AQUI
  //USERID DEVE SER UMA VERIFICACAO DE MIDDLEWARE, PASSANDO PELA VERIFICACAO SE O USUARIO É MESTRE DA CAMPANHA

  const campaignRepo = AppDataSource.getRepository(Campaign);
  const campaign = campaignRepo.findOneBy({ id: campaignIdParams });

  if (!campaign) {
    throw new AppError("camapaign not found", 403);
  }
  const newUpdateCampaign = campaignRepo.create({
    ...campaign,
    ...campaignData,
  });

  await campaignRepo.save(newUpdateCampaign);
  return newUpdateCampaign;
};

export default updateCampaignService;
