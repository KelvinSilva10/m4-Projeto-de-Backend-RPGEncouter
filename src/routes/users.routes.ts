import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";

import ensureUserAlreadyExistsMiddleware from "../middlewares/users/ensureUserAlreadyExists.middleware";
import ensureUserExistsMiddleware from "../middlewares/users/ensureUserExists.middleware";
import ensureUserIsActive from "../middlewares/users/ensureUserIsActive.middleware";
import {
  userSerializer,
} from "../serializers/user.schemas";

const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSerializer),
  ensureUserAlreadyExistsMiddleware,
  createUserController
);
userRoutes.get("", ensureAuthMiddleware, listUsersController);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIsActive,
  ensureUserExistsMiddleware,
  deleteUserController
);

export default userRoutes;
