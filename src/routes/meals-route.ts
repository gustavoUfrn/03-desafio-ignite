import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { checkSessionIdExist } from "../middlewares/check-sessionid-exists";
import { z } from "zod";
import { randomUUID } from "crypto";

export async function mealsRoutes(app: FastifyInstance) {
  app.get("/admin", async () => {
    const allMeals = await knex("meals").select("*");

    return { allMeals };
  });

  app.get("/", { preHandler: [checkSessionIdExist] }, async (request) => {
    const { sessionId } = request.cookies;

    const allMeals = await knex("meals").where("user_id", sessionId);

    return { allMeals };
  });

  app.get(
    "/totalmeals",
    { preHandler: [checkSessionIdExist] },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const totalmeals = (await knex("meals").where("user_id", sessionId))
        .length;

      const totalmealsondiet = await knex("meals")
        .where("user_id", sessionId)
        .sum("is_on_diet", { as: "amount" });

      return reply.status(201).send({
        "Total meals": totalmeals,
        "Total meals on diet": totalmealsondiet,
      });
    },
  );

  app.get(
    "/:id",
    { preHandler: [checkSessionIdExist] },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const getMealsParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getMealsParamsSchema.parse(request.params);

      const especificMeal = await knex("meals")
        .where({
          id,
          user_id: sessionId,
        })
        .first();

      return reply.status(201).send({ especificMeal });
    },
  );

  app.post(
    "/",
    { preHandler: [checkSessionIdExist] },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const createBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        isOnDiet: z.boolean(),
      });

      const { name, description, isOnDiet } = createBodySchema.parse(
        request.body,
      );

      await knex("meals").insert({
        id: randomUUID(),
        user_id: sessionId,
        name,
        description,
        is_on_diet: isOnDiet,
        date: Date.now(),
      });

      return reply.status(201).send();
    },
  );
}
