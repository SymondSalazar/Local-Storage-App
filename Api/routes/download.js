import { Router } from "express";
import { FileModel } from "../models/fileSystem.js";
import { ApiController } from "../controllers/Controller.js";

export const downloadRouter = Router()

downloadRouter.get('/', ApiController.controllerDescargar)

downloadRouter.get('/:pathRuta', ApiController.controllerDescargar)
