import { Body, Controller, Get, Post } from '@nestjs/common';
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
  
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.service.create(createUserDto);
  }
}
