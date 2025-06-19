import { Router } from "express";
import { usersRoutes } from "@/routes/users-routes";
import { sessionRouters } from "@/routes/session-routes";
import { deliveryRoutes } from "./deliveries-routes";

const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionRouters);
routes.use("/deliveries", deliveryRoutes);

export { routes };
