import { Router } from "express";
import {
  createCharacterController,
  deleteCharacterController,
  getCharacterController,
} from "../controllers/characters.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const charactersRoute = Router();

charactersRoute.post("", ensureAuthMiddleware, createCharacterController);
charactersRoute.get("/:id", ensureAuthMiddleware, getCharacterController);
charactersRoute.delete("/:id", ensureAuthMiddleware, deleteCharacterController);

export default charactersRoute;
