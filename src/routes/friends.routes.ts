import { Router } from "express";
import {
  createFriendController,
  getFriendController,
} from "../controllers/friends.controllers";
import ensureAuthMiddleware from "./../middlewares/ensureAuth.middleware";

const friendsRoute = Router();

friendsRoute.post("", ensureAuthMiddleware, createFriendController);
friendsRoute.get("", ensureAuthMiddleware, getFriendController);

export default friendsRoute;
