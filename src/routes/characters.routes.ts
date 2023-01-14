import { Router } from "express";
import {
  createCharacterController,
  deleteCharacterController,
  getCharacterController,
} from "../controllers/characters.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import characterNameAlreadUsedMiddleware from "./../middlewares/character/characterNameAlreadUsed.middleware";
import ensureCharacterAlreadyExists from "./../middlewares/character/ensureCharacterAlreadyExists.middleware";
import ensureUserCharacterIsOwner from "./../middlewares/character/ensureUserCharacterIsOwner.middleware";

const charactersRoute = Router();

charactersRoute.post(
  "",
  ensureAuthMiddleware,
  characterNameAlreadUsedMiddleware,
  createCharacterController
);
charactersRoute.get(
  "/:id",
  ensureAuthMiddleware,
  ensureCharacterAlreadyExists,
  ensureUserCharacterIsOwner,
  getCharacterController
);
charactersRoute.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureCharacterAlreadyExists,
  ensureUserCharacterIsOwner,
  deleteCharacterController
);

export default charactersRoute;
