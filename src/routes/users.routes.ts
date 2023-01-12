import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listCampaignsCreateByUserController,
  listCampaignsPlayedByUserController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";

import ensureUserAlreadyExistsMiddleware from "../middlewares/ensureUserAlreadyExistsMiddleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExistsMiddleware";
import {
  userSerializer,
  userUpdateSerializer,
} from "../serializers/user.schemas";

const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSerializer),
  ensureUserAlreadyExistsMiddleware,
  createUserController
);
userRoutes.get("", ensureAuthMiddleware, listUsersController);
userRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  listCampaignsPlayedByUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  deleteUserController
);
// userRoutes.patch(
//   "/:id",
//   ensureAuthMiddleware,
//   ensureUserExistsMiddleware,
//   ensureDataIsValidMiddleware(userUpdateSerializer),
//   updateUserController
// );

export default userRoutes;
