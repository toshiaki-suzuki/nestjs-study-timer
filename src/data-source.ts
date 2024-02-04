import "reflect-metadata"
import { DataSource } from "typeorm"
import { Record } from "./entities/record.entity"

export const AppDataConfig = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres'
});