import { Router } from "express";
import {
  createCampaignController,
  deleteCampaignController,
  deletePlayerCampaignController,
  getCampaignController,
  listCampaignsController,
  listPlayersCampaignsController,
  newPlayerCampaignController,
  updateCampaignController,
} from "../controllers/campaign.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import {
  campaignSerializer,
  campaignUpdateSerializer,
} from "../serializers/campaign.schemas";

const campaignRoutes = Router();

campaignRoutes.post(
  "",
  ensureAuthMiddleware,
  // ensureDataIsValidMiddleware(campaignSerializer),
  createCampaignController
);
campaignRoutes.get("", ensureAuthMiddleware, listCampaignsController);

campaignRoutes.get("/:id", ensureAuthMiddleware, getCampaignController);

campaignRoutes.delete("/:id", ensureAuthMiddleware, deleteCampaignController);

///REVISAR ROTA DO TROLLO
campaignRoutes.post(
  "/:idCampaign",
  ensureAuthMiddleware,
  newPlayerCampaignController
);

export default campaignRoutes;
