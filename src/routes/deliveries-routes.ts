import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveries-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const deliveryRoutes = Router();
const deliveriesController = new DeliveriesController();

// Passa pelo nosso fluxo de auth
deliveryRoutes.use(ensureAuthenticated);

deliveryRoutes.post('/', deliveriesController.create)

export { deliveryRoutes }