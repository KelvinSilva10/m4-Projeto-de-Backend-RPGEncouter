import { UserCampaign } from "../../entities/userCampaign.entity";
import { IUser } from "../users";

export interface ICampaignRequest {
  name: string;
  // playersAmount?: number;
  description: string;
  rpgGame: string;
  campaignImg: string;
  plataform: string;
  campaignPlayers?: UserCampaign[];
}

export interface ICampaignResponse {
  id: string;
  name: string;
  // playersAmount: number;
  description: string;
  rpgGame: string;
  campaignImg: string;
  plataform: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  // campaignPlayers: IUser;
  campaignPlayers: UserCampaign[];
}

export interface ICampaignUpdateRequest {
  name?: string;
  description?: string;
  rpgGame?: string;
  campaignImg?: string;
  plataform?: string;
}

// export interface IUser {
//   id: string;
//   name: string;
//   email: string;
//   isAdm: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface IUserLogin {
//   email: string;
//   password: string;
// }

// export interface IUserUpdateRequest {
//   name?: string;
//   email?: string;
//   password?: string;
//   nick?: string;
//   profileImg?: string;
// }

// export interface IUserUpdateResponse {
//   name?: string;
//   email?: string;
//   nick?: string;
//   profileImg?: string;
// }
