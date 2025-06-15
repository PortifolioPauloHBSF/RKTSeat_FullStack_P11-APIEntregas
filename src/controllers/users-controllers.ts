import { Request, Response } from "express";
import { hash } from "bcrypt";
import { z } from "zod";

class UsersController {
    async create(request: Request, response: Response): Promise<any> {
        const bodySchema = z.object({
            name: z.string().trim().min(2),
            email: z.string().trim().email(),
            password: z.string().trim().min(6),
        });

        const { name, email, password } = bodySchema.parse(request.body);
        const hashedPassword = await hash(password, Number(process.env.PASSWORD_HASH));

        return response.json({ message: "Ok", hashedPassword });
    }
}

export { UsersController };
