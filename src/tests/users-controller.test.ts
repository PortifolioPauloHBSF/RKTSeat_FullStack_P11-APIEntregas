import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("UsersController", () => {
    let user_id: string;

    it("should create a new user sucessfully", async () => {
        const response = await request(app).post("/users").send({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Test User");

        // Salvando o ID gerado ao gravar usuário.
        user_id = response.body.id;
    });

    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } });
    });
});
