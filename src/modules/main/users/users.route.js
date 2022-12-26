import { Router } from "express";
import UsersController from "./users.controller.js"

export const UsersRouter = Router();

UsersRouter.route('/').post(UsersController.createNewUser);
UsersRouter.route('/').get(UsersController.getUser);
UsersRouter.route('/:id').put(UsersController.updateUser);