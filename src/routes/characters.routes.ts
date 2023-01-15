import { Router } from "express";
import {
  createCharacterController,
  deleteCharacterController,
  getCharacterController,
} from "../controllers/characters.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureUserHasCharacter from "../middlewares/character/ensureUserHasCharacter.middleware";
import ensureCharacterAlreadyExists from "./../middlewares/character/ensureCharacterAlreadyExists.middleware";
import ensureUserCharacterIsOwner from "./../middlewares/character/ensureUserCharacterIsOwner.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { characterSerializer } from "../serializers/character.schemas";

const charactersRoute = Router();

charactersRoute.post(
  "",
  ensureAuthMiddleware,
  ensureUserHasCharacter,
  ensureDataIsValidMiddleware(characterSerializer),
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
