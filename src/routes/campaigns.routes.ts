import { Router } from "express";
import {
  createCampaignController,
  deleteCampaignController,
  getCampaignController,
  listCampaignsController,
  newPlayerCampaignController,
} from "../controllers/campaign.controllers";
import validadeCampaign from "../middlewares/campaigns/validateCampaign.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const campaignRoutes = Router();

campaignRoutes.post(
  "",
  ensureAuthMiddleware,
  // ensureDataIsValidMiddleware(campaignSerializer),
  createCampaignController
);
campaignRoutes.get("", ensureAuthMiddleware, listCampaignsController);

campaignRoutes.get("/:id", ensureAuthMiddleware, validadeCampaign, getCampaignController);

campaignRoutes.delete("/:id", ensureAuthMiddleware, validadeCampaign, deleteCampaignController);

campaignRoutes.post(
  "/:idCampaign",
  ensureAuthMiddleware,
  newPlayerCampaignController
);

export default campaignRoutes;
