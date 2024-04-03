import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { checkSessionIdExist } from "../middlewares/check-sessionid-exists";
import { z } from "zod";
import { randomUUID } from "crypto";

export async function mealsRoutes(app: FastifyInstance) {
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
  app.get(
    "/:id",
    { preHandler: [checkSessionIdExist] },
    async (request, reply) => {
      const getMealsParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getMealsParamsSchema.parse(request.params);

      const especificMeal = await knex("meals")
        .where({
          id,
        })
        .first();

      if (!especificMeal) {
        return reply.status(400).send({ error: "Meal not found" });
      }

      return reply.status(201).send({ especificMeal });
    },
  );
  app.get("/", { preHandler: [checkSessionIdExist] }, async (request) => {
    const { sessionId } = request.cookies;

    const allMeals = await knex("meals")
      .where("user_id", sessionId)
      .orderBy("date");

    return { allMeals };
  });
  app.get(
    "/usermetrics/:id",
    { preHandler: [checkSessionIdExist] },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const totalmeals = await knex("meals")
        .where({
          user_id: sessionId,
        })
        .count("is_on_diet", { as: "amount" });

      const totalmealsOffDiet = await knex("meals")
        .where({
          user_id: sessionId,
          is_on_diet: false,
        })
        .count("is_on_diet", { as: "amount" });

      const totalmealsOnDiet = await knex("meals")
        .where({
          user_id: sessionId,
          is_on_diet: true,
        })
        .sum("is_on_diet", { as: "amount" });

      return reply.status(201).send({
        "Total meals: ": totalmeals,
        "Total meals off diet:": totalmealsOffDiet,
        "Total meals on diet:": totalmealsOnDiet,
      });
    },
  );
  app.put(
    "/:id",
    { preHandler: [checkSessionIdExist] },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const idMealShcema = z.object({
        id: z.string().uuid(),
      });

      const { id } = idMealShcema.parse(request.params);

      const updateBodyShecma = z.object({
        name: z.string(),
        description: z.string(),
        isOnDiet: z.boolean(),
      });

      const { name, description, isOnDiet } = updateBodyShecma.parse(
        request.body,
      );

      const updateMealInfo = await knex("meals")
        .where({
          id,
          user_id: sessionId,
        })
        .update({
          name,
          description,
          is_on_diet: isOnDiet,
          date: Date.now(),
        });

      if (!updateMealInfo) {
        return reply.status(401).send();
      }
      return reply.status(204).send();
    },
  );
  app.delete(
    "/:id",
    { preHandler: [checkSessionIdExist] },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const mealParamShcema = z.object({
        id: z.string().uuid(),
      });

      const { id } = mealParamShcema.parse(request.params);

      const deleteMeal = await knex("meals")
        .where({
          id,
          user_id: sessionId,
        })
        .del(["*"]);

      if (!deleteMeal) {
        return reply.status(401).send();
      }

      return reply.status(204).send();
    },
  );
}
