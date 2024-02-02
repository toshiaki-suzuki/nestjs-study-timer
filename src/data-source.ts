import "reflect-metadata"
import { DataSource } from "typeorm"
import { Record } from "./entities/record.entity"

export const AppDataConfig = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true, // true in only dev env
  entities: ["src/entities/*.{js,ts}"],
  migrations: ["src/migrations/*.{js,ts}"],
});