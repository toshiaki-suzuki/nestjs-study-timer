import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataConfig } from './data-source';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [RecordsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 15432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true, // true in only dev env
    autoLoadEntities: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
