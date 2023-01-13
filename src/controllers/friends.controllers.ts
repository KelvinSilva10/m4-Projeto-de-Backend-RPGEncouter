import { Request, Response } from "express";
import getCharacterService from "../services/characters/getCharacter.service";
import createFriendService from "../services/friends/createFriend.service";
import getFriendService from "../services/friends/getFriend.service";

const createFriendController = async (req: Request, res: Response) => {
  const friendterData: string = req.body.nick;
  // const friendId: string = req.params.id;
  const userId: string = req.user.id;
  const newFriend = await createFriendService(friendterData, userId);
  return res.status(201).json(newFriend);
};

const getFriendController = async (req: Request, res: Response) => {
  // const friendId: string = req.params.id;
  const userId: string = req.user.id;
  const friend = await getFriendService(userId);

  return res.status(200).json(friend);
};

export { createFriendController, getFriendController };
