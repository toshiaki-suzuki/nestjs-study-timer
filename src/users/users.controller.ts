import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<User> {
    return await this.service.find(id);
  }
  
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.service.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.service.update(id, createUserDto);
  }
}
