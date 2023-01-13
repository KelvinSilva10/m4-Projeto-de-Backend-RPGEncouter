import { Router } from "express";
import {
  createFriendController,
  getFriendController,
} from "../controllers/friends.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureUserAndFriendExists from "../middlewares/friend/ensureUserAndFriendExists.middleware";

const friendsRoute = Router();

friendsRoute.post("", ensureAuthMiddleware, ensureUserAndFriendExists, createFriendController);
friendsRoute.get("", ensureAuthMiddleware, getFriendController);

export default friendsRoute;
