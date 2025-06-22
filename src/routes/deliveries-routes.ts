import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveries-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const deliveryRoutes = Router();
const deliveriesController = new DeliveriesController();

// Passa pelo nosso fluxo de auth
deliveryRoutes.use(ensureAuthenticated);
deliveryRoutes.use(verifyUserAuthorization(["sale"]));

deliveryRoutes.get("/", deliveriesController.index);
deliveryRoutes.post("/", deliveriesController.create);

export { deliveryRoutes };
