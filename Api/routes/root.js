import { Router } from "express";
import { ApiController } from "../controllers/Controller.js";

export const rootRouter = Router()

rootRouter.get('/',ApiController.controllerFolder)

rootRouter.get('/:pathRuta', ApiController.controllerFolder)

rootRouter.post('/',ApiController.controllerSubirArchivo)

rootRouter.post('/:pathRuta', ApiController.controllerFolder)

rootRouter.delete('/:pathRuta',ApiController.controllerBorrarArchivo)

rootRouter.delete('/', ApiController.controllerBorrarArchivo)

