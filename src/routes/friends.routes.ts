import { Router } from "express";

const friendsRoute = Router();

friendsRoute.post("/:id");
friendsRoute.get("/:id");

export default friendsRoute;
