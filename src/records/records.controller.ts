import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Record } from '../entities/record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get(':id')
  find(@Param('id') id: number):Promise<Record> {
    return this.recordsService.find(id); 
  }

  @Post()
  create(@Body() createRecordDto: CreateRecordDto):Promise<Record> {
    return this.recordsService.create(createRecordDto);
  }
}
