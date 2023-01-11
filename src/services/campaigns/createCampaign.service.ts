import AppDataSource from "../../data-source";
import { Campaign } from "../../entities/campaign.entity";
import { User } from "../../entities/user.entity";
import { ICampaignRequest, ICampaignResponse } from "../../interfaces/campaign";
import { IUserRequest, IUserResponse } from "../../interfaces/users";
import { userWithoutPasswordSerializer } from "../../serializers/user.schemas";

const createCampaignService = async (
  userData: ICampaignRequest
): Promise<ICampaignResponse> => {
  //CÓDIGO AQUI

  const campaignRepo = AppDataSource.getRepository(Campaign);

  const campaign = campaignRepo.create(userData);

  await campaignRepo.save(campaign);
  return campaign;
};

export default createCampaignService;
