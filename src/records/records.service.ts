import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from 'src/entities/record.entity';
import { Repository } from 'typeorm';
import { AppDataConfig } from '../data-source';
import { CreateRecordDto } from './dto/create-record.dto';

const dataSource = AppDataConfig;
@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record) private readonly recordRepository: Repository<Record>,
  ) {}
	
	async findAll(): Promise<Record[]> {
		return await this.recordRepository.find();
	}

  async find(id: number): Promise<Record> {
    const found =  await this.recordRepository.findOneBy({ id });
		if (!found) throw new NotFoundException();
    return found;
  }

	async create(createRecordDto: CreateRecordDto): Promise<Record> {
		const { material, learningTime, description } = createRecordDto;
		const record = this.recordRepository.create({
			material,
			learningTime,
			description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
		});
		await this.recordRepository.save(record);
		return record;
	}
}
