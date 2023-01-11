import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ICampaignRequest } from "../interfaces/campaign";
import createCampaignService from "../services/campaigns/createCampaign.service";
import deleteCampaignService from "../services/campaigns/deleteCampaign.service";
import deletePlayerCampaignService from "../services/campaigns/deletePlayerCampaign.service";
import getCampaignService from "../services/campaigns/getCampaing.service";
import listCampaignsService from "../services/campaigns/listCampaings.service";
import listPlayersCampaignsService from "../services/campaigns/listPlayersCampaings.service";
import newPlayerCampaignService from "../services/campaigns/newPlayerCampaign.service";
import updateCampaignService from "../services/campaigns/updateCampaign.service";

const createCampaignController = async (req: Request, res: Response) => {
  const campaignData: ICampaignRequest = req.body;
  const newCampaign = await createCampaignService(campaignData);
  return res.status(201).json(newCampaign);
};

const listCampaignsController = async (req: Request, res: Response) => {
  const campaigns = await listCampaignsService();

  return res.json(campaigns);
};

const getCampaignController = async (req: Request, res: Response) => {
  const campaign = await getCampaignService();

  return res.json(campaign);
};

const deleteCampaignController = async (req: Request, res: Response) => {
  await deleteCampaignService(req.params.id);
  return res.status(204).json({});
};

const updateCampaignController = async (req: Request, res: Response) => {
  const campaignData: ICampaignRequest = req.body;
  const campaignIdParams = req.params.id;
  const userId = String(req.user.id);

  const updateCampaign = await updateCampaignService(
    campaignIdParams,
    campaignData,
    userId
  );

  return res.json(updateCampaign);
};

const newPlayerCampaignController = async (req: Request, res: Response) => {
  const idCampaign = req.params.id;
  const newPlayer = await newPlayerCampaignService(idCampaign);
  return res.status(201).json(newPlayer);
};

const deletePlayerCampaignController = async (req: Request, res: Response) => {
  const idCampaign = req.params.id;
  await deletePlayerCampaignService(idCampaign);
  return res.status(204).json({});
};

const listPlayersCampaignsController = async (req: Request, res: Response) => {
  const players = await listPlayersCampaignsService();

  return res.json(players);
};

export {
  createCampaignController,
  listCampaignsController,
  updateCampaignController,
  deleteCampaignController,
  getCampaignController,
  newPlayerCampaignController,
  deletePlayerCampaignController,
  listPlayersCampaignsController,
};
