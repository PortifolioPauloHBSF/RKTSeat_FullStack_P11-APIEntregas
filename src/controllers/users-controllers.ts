import { Request, Response } from "express";

class UsersController {
    create(request: Request, response: Response): any {
        return response.json({ message: "Ok" });
    }
}

export { UsersController };
