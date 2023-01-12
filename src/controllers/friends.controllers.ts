import { Request, Response } from "express";
import createFriendService from "../services/friends/createFriend.service";

const createFriendController = async (req: Request, res: Response) => {
  const friendterData = req.body;
  const idFriend = req.params.id;
  const newFriend = await createFriendService(friendterData, idFriend);
  return res.status(201).json(newFriend);
};

const getFriendController = async (req: Request, res: Response) => {
  const idfriend = req.params.id;
  const friend = await getCharacterService(idfriend);

  return res.json(friend);
};

export { createFriendController, getFriendController };
