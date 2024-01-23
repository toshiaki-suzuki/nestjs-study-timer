import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordsModule } from './records/records.module';

const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [],
  synchronize: true, // true in only dev env
};

@Module({
  imports: [RecordsModule, TypeOrmModule.forRoot(typeOrmModuleOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
