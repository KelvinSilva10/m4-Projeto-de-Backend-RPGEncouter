import { Request, Response } from "express";
import createCharacterService from "../services/characters/createCharacter.service";
import getCharacterService from "../services/characters/getCharacter.service";
import deleteCharacterService from "./../services/characters/deleteCharacter.service";

const createCharacterController = async (req: Request, res: Response) => {
  const characterData = req.body;
  const newCharacter = await createCharacterService(characterData);
  return res.status(201).json(newCharacter);
};

const getCharacterController = async (req: Request, res: Response) => {
  const idCharacter = req.params.id;
  const character = await getCharacterService(idCharacter);

  return res.json(character);
};

const deleteCharacterController = async (req: Request, res: Response) => {
  await deleteCharacterService(req.params.id);
  return res.status(204).json({});
};

export {
  createCharacterController,
  getCharacterController,
  deleteCharacterController,
};
