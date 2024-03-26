import "knex";

declare module "kenx/types/tables" {
  export interface Table {
    users: {
      id: string;
      session_id: string;
      name: string;
      email: string;
    };
    meals: {
      id: string;
      user_id: string;
      name: string;
      description: string;
      is_on_diet: boolean;
      date: number;
    };
  }
}
