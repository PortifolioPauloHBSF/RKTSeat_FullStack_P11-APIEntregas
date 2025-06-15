import { Request, Response } from "express";
import { z } from "zod";

class UsersController {
    create(request: Request, response: Response): any {
        const bodySchema = z.object({
            name: z.string().trim().min(2),
            email: z.string().trim().email(),
            password: z.string().trim().min(6),
        });

        const { name, email, password } = bodySchema.parse(request.body);
        console.log(name, email, password)
        return response.json({ message: "Ok" });
    }
}

export { UsersController };
