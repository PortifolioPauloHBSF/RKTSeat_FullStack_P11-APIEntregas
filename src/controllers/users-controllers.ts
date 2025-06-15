import { Request, Response } from "express";
import { hash } from "bcrypt";
import { z } from "zod";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class UsersController {
    async create(request: Request, response: Response): Promise<any> {
        const bodySchema = z.object({
            name: z.string().trim().min(2),
            email: z.string().trim().email(),
            password: z.string().trim().min(6),
        });

        const { name, email, password } = bodySchema.parse(request.body);

        // Validando se o email já está cadastrado.
        const userWithSameEmail = await prisma.user.findFirst({ where: { email } });
        if (userWithSameEmail) {
            throw new AppError("Email already in use.");
        }

        // Criptografando a senha do usuário e salvando no banco.
        const hashedPassword = await hash(password, Number(process.env.PASSWORD_HASH));
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Retornando apenas o essencial
        const { password: _, ...userWithoutPassword } = user

        return response.json(userWithoutPassword);
    }
}

export { UsersController };
