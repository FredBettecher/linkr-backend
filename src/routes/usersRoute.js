import { Router } from "express";
import { getUsers } from "../controllers/userController.js";

export const usersRoute = Router();
usersRoute.get("/users", getUsers);