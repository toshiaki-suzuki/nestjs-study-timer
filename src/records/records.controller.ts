import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { GetUser } from 'src/users/decorator/get-user.decorator';
import { Record } from '../entities/record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordsService } from './records.service';

@Controller('records')
@UseGuards(JwtAuthGuard)
@UseInterceptors(LoggingInterceptor)
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  async findAll(): Promise<Record[]> {
    return await this.recordsService.findAll();
  }

  @Get(':id')
  async find(@Param('id', ParseUUIDPipe) id: string): Promise<Record> {
    return await this.recordsService.find(id);
  }

  @Post()
  async create(
    @Body() createRecordDto: CreateRecordDto,
    @GetUser() user: User,
  ): Promise<Record> {
    createRecordDto.userId = user.id;
    return await this.recordsService.create(createRecordDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createRecordDto: CreateRecordDto,
  ): Promise<Record> {
    return await this.recordsService.update(id, createRecordDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Record> {
    return await this.recordsService.remove(id);
  }
}
