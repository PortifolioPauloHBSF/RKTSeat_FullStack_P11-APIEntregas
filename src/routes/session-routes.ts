import { Router } from "express";
import { SessionsController } from "@/controllers/sessions-controller";

const sessionRouters = Router();
const sessionController = new SessionsController();

sessionRouters.post("/", sessionController.create);

export { sessionRouters };
