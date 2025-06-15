import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";

class SessionsController {
    async create(request: Request, response: Response): Promise<any> {
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        });

        const { email, password } = bodySchema.parse(request.body);

        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user) {
            throw new AppError("Invalid Email or Password", 401);
        }

        const passwordMathced = await compare(password, user.password)
        if (!passwordMathced) {
            throw new AppError("Invalid Email or Password", 401);
        }

        return response.json({ message: "Ok" });
    }
}

export { SessionsController };
