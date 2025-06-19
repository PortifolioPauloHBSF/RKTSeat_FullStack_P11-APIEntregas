import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";

interface TokenPaylod {
    role: string;
    sub: string;
}

function EnsureAuthenticated(request: Request, response: Response, next: NextFunction) {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new AppError("JWT Token not found.", 401);
        }

        // Bearer 328u1djs823e131
        const [_, token] = authHeader.split(" ");
        const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPaylod;

        request.user = {
            id: user_id,
            role,
        };

        return next();
    } catch (error) {
        throw new AppError("Invalid JWT token!", 401);
    }
}

export { EnsureAuthenticated };
