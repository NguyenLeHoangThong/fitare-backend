import { Router } from "express";
import UsersController from "./users.controller.js"

export const UsersRouter = Router();

UsersRouter.route('/').post(UsersController.createNewUser);
UsersRouter.route('/:id').get(UsersController.getAvailableUsers);
UsersRouter.route('/:id').put(UsersController.updateUser);