import { Router } from "express";
import ReportController from "./report.controller.js"

export const ReportRouter = Router();

ReportRouter.route('/').post(ReportController.createNewReport);
ReportRouter.route('/admin').get(ReportController.getAllReport);
