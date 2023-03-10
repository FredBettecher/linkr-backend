import { Router } from "express";
import { getAnotherUserPage, getUsers } from "../controllers/userController.js";

export const usersRoute = Router();
usersRoute.get("/users", getUsers);
usersRoute.get("/user/:id", getAnotherUserPage);