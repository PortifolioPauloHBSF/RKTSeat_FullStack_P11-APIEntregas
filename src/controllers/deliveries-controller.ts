import { Request, Response } from "express";

class DeliveriesController {
    create(request: Request, response: Response): any {
        return response.json({ message: "OK!" });
    }
}
export { DeliveriesController };
