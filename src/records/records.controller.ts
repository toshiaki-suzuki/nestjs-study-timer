import { Controller, Get, Param } from '@nestjs/common';
import { Record } from 'src/entities/record.entity';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get(':id')
  find(@Param('id') id: number):Promise<Record> {
      return this.recordsService.find(id); 
  }
}
