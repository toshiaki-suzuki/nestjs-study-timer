import { config } from 'dotenv';
import "reflect-metadata"
import { DataSource } from "typeorm"

config(); // 環境変数をロード

export const AppDataConfig = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ["src/entities/*.ts"], 
  migrations: ["migrations/*.ts"]
});