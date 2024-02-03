import { Test, TestingModule } from '@nestjs/testing';
import sqlite3 from 'sqlite3';
import { Column, DataSource, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Record } from '../entities/record.entity';
import { RecordsService } from './records.service';
const { Database } = sqlite3.verbose();

const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  entities: [Record],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

let db: sqlite3.Database;
beforeAll(done => {
  db = new Database(':memory:', done);
  db.serialize(() => {
    db.run("CREATE TABLE test_table (id INTEGER PRIMARY KEY, value TEXT)");
  });
});

afterAll(async () => {
  // データベースのクローズ
  db.close();
});


describe('RecordsService', () => {
  let service: RecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordsService],
    }).compile();

    service = module.get<RecordsService>(RecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
