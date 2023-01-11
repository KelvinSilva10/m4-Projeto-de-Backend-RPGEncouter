import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { ICampaignRequest, ICampaignResponse } from "../../interfaces/campaign";
import { IUserRequest, IUserResponse } from "../../interfaces/users";
import { userWithoutPasswordSerializer } from "../../serializers/user.schemas";

const createCampaignService = async (
  userData: ICampaignRequest
): Promise<ICampaignResponse> => {
  //CÓDIGO AQUI 

  
  return;
};

export default createCampaignService;
