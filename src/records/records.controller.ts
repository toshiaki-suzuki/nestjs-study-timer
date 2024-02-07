import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Record } from '../entities/record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  findAll():Promise<Record[]> {
    return this.recordsService.findAll(); 
  }

  @Get(':id')
  find(@Param('id') id: number):Promise<Record> {
    return this.recordsService.find(id); 
  }

  @Post()
  create(@Body() createRecordDto: CreateRecordDto):Promise<Record> {
    return this.recordsService.create(createRecordDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() createRecordDto: CreateRecordDto):Promise<Record> {
    return this.recordsService.update(id, createRecordDto);
  }
}
