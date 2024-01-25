import "reflect-metadata"
import { DataSource } from "typeorm"
import { Record } from "./records/record.entity"

export const AppDataConfig = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 15432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [Record],
  synchronize: true, // true in only dev env
  migrations: ['src/migration/*.ts'],
});