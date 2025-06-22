import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { z } from "zod";

class DeliveryLogsController {
    async create(request: Request, response: Response): Promise<any> {
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string(),
        });

        const { delivery_id, description } = bodySchema.parse(request.body);
        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id },
        });

        if (!delivery) {
            throw new AppError("delivery not found!", 404);
        }

        if (delivery.status === "processing") {
            throw new AppError("delivery is not at shipped status already", 404);
        }

        if (delivery.status === "delivered") {
            throw new AppError("this delivery has already been delivered");
        }

        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description,
            },
        });

        return response.status(201).json();
    }

    async show(request: Request, response: Response): Promise<any> {
        const paramsSchema = z.object({
            delivery_id: z.string().uuid(),
        });

        const { delivery_id } = paramsSchema.parse(request.params);

        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id },
            include: {
                deliveryLogs: {
                    select: {
                        description: true,
                        createdAt: true,
                    },
                },
            },
        });

        if (!delivery) {
            return response.json({ message: "delivery not found" });
        }

        if (request.user?.role === "customer" && request.user.id !== delivery?.userId) {
            throw new AppError("you can only view your own deliveries", 401);
        }

        return response.json(delivery);
    }
}

export { DeliveryLogsController };
