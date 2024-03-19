import { knex as setupKnex, Knex } from "knex";

export const config: Knex.Config = {
  client: "sqlite",
  connection: {
    filename: "./tmp/db/app.db",
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./tmp/db/migrations",
  },
};

export const knex = setupKnex(config);
