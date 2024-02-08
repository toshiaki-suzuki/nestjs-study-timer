import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Record } from '../entities/record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  async findAll(): Promise<Record[]> {
    return await this.recordsService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Record> {
    return await this.recordsService.find(id);
  }

  @Post()
  async create(@Body() createRecordDto: CreateRecordDto): Promise<Record> {
    return await this.recordsService.create(createRecordDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createRecordDto: CreateRecordDto,
  ): Promise<Record> {
    return await this.recordsService.update(id, createRecordDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Record> {
    return await this.recordsService.remove(id);
  }
}
