import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function usersRoutes(app: FastifyInstance) {
  // app.get("/hello", async () => {
  //   const tables = await knex("sqlite_schema").select("*");

  //   return tables;
  // });

  app.get("/admin", async () => {
    const users = await knex("users").select("*");

    return { users };
  });

  app.post("/", async (request, reply) => {
    const createBodySchema = z.object({
      name: z.string(),
      email: z.string(),
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

    await knex("users").insert({
      id: randomUUID(),
      name,
      email,
      session_id: sessionId,
    });

    return reply.status(201).send();
  });
}
