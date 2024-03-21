import fastify from "fastify";
import { usersRoutes } from "./routes/user-routes";
import cookie from "@fastify/cookie";
import { mealsRoutes } from "./routes/meals-route";

const app = fastify();

app.register(cookie);

app.register(usersRoutes, {
  prefix: "/users",
});

app.register(mealsRoutes, {
  prefix: "/meals",
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Servidor rodando!");
  });
