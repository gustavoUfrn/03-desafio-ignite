import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { checkSessionIdExist } from "../middlewares/check-sessionid-exists";
import { z } from "zod";
import { randomUUID } from "crypto";

export async function mealsRoutes(app: FastifyInstance) {
  // Deve ser possivel registrar uma refeição
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
  // Admin get to see all item on DB
  app.get("/admin", async () => {
    const allMeals = await knex("meals").select("*");

    return { allMeals };
  });
  // Deve ser possivel listar todas as refeições de um usuario
  app.get("/", { preHandler: [checkSessionIdExist] }, async (request) => {
    const { sessionId } = request.cookies;

    const allMeals = await knex("meals").where("user_id", sessionId);

    return { allMeals };
  });
  // Deve ser possivel visualizar uma unica refeição
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
  // Algumas metricas do usuario
  app.get(
    "/totalmeals",
    { preHandler: [checkSessionIdExist] },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const totalmeals = (await knex("meals").where("user_id", sessionId))
        .length;

      const totalmealsondiet: number = await knex("meals")
        .where("user_id", sessionId)
        .sum("is_on_diet");

      return reply.status(201).send({
        "Total meals": totalmeals,
        "Total meals on diet": totalmealsondiet,
        "Total meals off diet": totalmealsondiet - totalmeals,
      });
    },
  );
  // Deve ser capaz de deletar uma refeição
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
  // Deve ser capaz de alterar os dados de uma refeição
  app.patch(
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
}
