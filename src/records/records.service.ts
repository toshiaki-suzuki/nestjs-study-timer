import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from 'src/entities/record.entity';
import { Repository } from 'typeorm';
import { AppDataConfig } from '../data-source';
import { CreateRecordDto } from './dto/create-record.dto';

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

	async create(createRecordDto: CreateRecordDto): Promise<Record> {
		const { material, learningTime, description } = createRecordDto;
		const record = this.recordRepository.create({
			material,
			learningTime,
			description,
		});
		return await this.recordRepository.save(record);
	}
}
