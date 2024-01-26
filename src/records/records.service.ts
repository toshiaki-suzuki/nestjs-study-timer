import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from 'src/entities/record.entity';
import { Repository } from 'typeorm';
import { AppDataConfig } from '../data-source';

const dataSource = AppDataConfig;
const recordRepository = dataSource.getRepository(Record)
@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record) private readonly recordRepository: Repository<Record>,
  ) {}
  async find(id: number): Promise<Record> {
    return await this.recordRepository.findOneBy({ id });
  }
}
