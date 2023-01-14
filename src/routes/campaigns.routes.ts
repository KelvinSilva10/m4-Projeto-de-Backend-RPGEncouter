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
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { campaignSerializer } from "../serializers/campaign.schemas";

const campaignRoutes = Router();

campaignRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(campaignSerializer),
  createCampaignController
);
campaignRoutes.get("", ensureAuthMiddleware, listCampaignsController);

campaignRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  validadeCampaign,
  getCampaignController
);

campaignRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  validadeCampaign,
  deleteCampaignController
);

campaignRoutes.post(
  "/:id",
  ensureAuthMiddleware,
  validadeCampaign,
  newPlayerCampaignController
);

export default campaignRoutes;
