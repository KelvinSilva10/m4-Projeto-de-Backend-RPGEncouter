import { IUser } from "./../users/index";

export interface IFriendResponse {
  id: string;
  nick: string;
  user: IUser;
}
