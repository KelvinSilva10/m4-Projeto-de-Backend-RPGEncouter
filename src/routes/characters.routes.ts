import { Router } from "express";
import {
  createCharacterController,
  deleteCharacterController,
  getCharacterController,
} from "../controllers/characters.controllers";

const charactersRoute = Router();

charactersRoute.post("", createCharacterController);
charactersRoute.get("/:id", getCharacterController);
charactersRoute.delete("/:id", deleteCharacterController);

export default charactersRoute;
