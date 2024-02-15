import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataConfig = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ["src/entities/*.ts"], 
  migrations: ["migrations/*.ts"]
});