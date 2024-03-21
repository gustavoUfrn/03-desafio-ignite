import { FastifyReply, FastifyRequest } from "fastify";

export function checkSessionIdExist(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId;

  if (!sessionId) {
    return reply.status(401).send({
      error: "unathorized",
    });
  }
}
