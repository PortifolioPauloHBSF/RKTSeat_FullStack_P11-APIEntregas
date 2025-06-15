import { Router } from "express";
import { usersRoutes } from "@/routes/users-routes";
import { sessionRouters } from "@/routes/session-routes";

const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionRouters);

export { routes };
