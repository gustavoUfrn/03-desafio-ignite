import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const createBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
    });

    const { name, email } = createBodySchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    const userByEmail = await knex("users").where({ email }).first();

    if (userByEmail) {
      return reply.status(400).send({ message: "User already exist!" });
    }

    await knex("users").insert({
      id: randomUUID(),
      name,
      email,
      session_id: sessionId,
    });

    return reply.status(201).send();
  });
}
