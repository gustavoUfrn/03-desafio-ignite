// Deve ser possivel identificar o user entre as requisições
import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../database";

export async function checkSessionIdExist(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId;

  if (!sessionId) {
    return reply.status(401).send({
      error: "unathorized",
    });
  }

  const user = await knex("users").where({ session_id: sessionId }).first();

  if (!user) {
    return reply.status(401).send({ error: "Unauthorized" });
  }

  request.user = user;
}
