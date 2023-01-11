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
  ensureDataIsValidMiddleware(campaignSerializer),
  createCampaignController
);
campaignRoutes.get("", ensureAuthMiddleware, listCampaignsController);
campaignRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(campaignUpdateSerializer),
  updateCampaignController
);
campaignRoutes.get("/:id", ensureAuthMiddleware, getCampaignController);
campaignRoutes.get(
  "/:id/players",
  ensureAuthMiddleware,
  listPlayersCampaignsController
);
campaignRoutes.delete("/:id", ensureAuthMiddleware, deleteCampaignController);
campaignRoutes.post("/:id", ensureAuthMiddleware, newPlayerCampaignController);
campaignRoutes.delete(
  "/:idCampaign/:idPlayer",
  ensureAuthMiddleware,
  deletePlayerCampaignController
);

export default campaignRoutes;
