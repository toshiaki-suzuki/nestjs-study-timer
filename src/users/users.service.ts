import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, description, birthday } = createUserDto;
    console.log(name, email, password, description, birthday);
    
    const user = this.repository.create({
      name,
      email,
      password,
      description,
      birthday,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    await this.repository.save(user);
    return user;
  }
}
