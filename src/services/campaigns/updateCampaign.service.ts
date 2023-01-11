import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { ICampaignRequest } from "../../interfaces/campaign";

const updateCampaignService = async (
  campaignIdParams: string,
  campaignData: ICampaignRequest,
  userId: string
) => {
  //CÓDIGO AQUI

  return;
};

export default updateCampaignService;
