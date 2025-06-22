import { Router } from "express";
import { usersRoutes } from "@/routes/users-routes";
import { sessionRouters } from "@/routes/session-routes";
import { deliveryRoutes } from "@/routes/deliveries-routes";
import { deliveryLogsRoutes } from "@/routes/delivery-logs-routes";

const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionRouters);
routes.use("/deliveries", deliveryRoutes);
routes.use("/delivery-logs", deliveryLogsRoutes);

export { routes };
