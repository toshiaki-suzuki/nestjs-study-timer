import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Record } from '../entities/record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordsService } from './records.service';

@Controller('records')
@UseGuards(JwtAuthGuard)
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  async findAll(): Promise<Record[]> {
    return await this.recordsService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Record> {
    return await this.recordsService.find(id);
  }

  @Post()
  async create(@Body() createRecordDto: CreateRecordDto): Promise<Record> {
    return await this.recordsService.create(createRecordDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createRecordDto: CreateRecordDto,
  ): Promise<Record> {
    return await this.recordsService.update(id, createRecordDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Record> {
    return await this.recordsService.remove(id);
  }
}
