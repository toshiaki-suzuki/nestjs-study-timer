import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';


@Controller('users')
@UseGuards(JwtAuthGuard)
export default class UsersController {
  constructor(private readonly service: UsersService) {}

  
  @Get()
  async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.service.find(id);
  }
  
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.service.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.service.update(id, createUserDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.service.delete(id);
  }
}
