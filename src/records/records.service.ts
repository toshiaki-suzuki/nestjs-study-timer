import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

	async update(id: number, createRecordDto: CreateRecordDto): Promise<Record> {
		const { material, learningTime, description } = createRecordDto;
		const record = await this.find(id);
		if (!record) throw new NotFoundException();
	
		const oldRecord = { ...record }; // 既存のレコードをコピー
	
		record.material = material ?? record.material;
		record.learningTime = learningTime ?? record.learningTime;
		record.description = description ?? record.description;
		record.updatedAt = new Date().toISOString();
	
		// 更新する値がない場合は400エラーを返す
		if (
			oldRecord.material === record.material &&
			oldRecord.learningTime === record.learningTime &&
			oldRecord.description === record.description
		) {
			throw new HttpException('No changes to update', HttpStatus.BAD_REQUEST);
		}
	
		await this.recordRepository.save(record);
		return record;
	}

	async remove(id: number): Promise<Record> {
		const record = await this.find(id);
		if (!record) throw new NotFoundException();
		return await this.recordRepository.remove(record);
	}
}
