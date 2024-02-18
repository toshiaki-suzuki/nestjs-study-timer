import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async find(id: number): Promise<User> {
    const found =  await this.repository.findOneBy({ id });
		if (!found) throw new NotFoundException();
    return found;
  }
  
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

	async update(id: number, createUserDto: CreateUserDto): Promise<User> {
		const { name, email, password, description, birthday } = createUserDto;
		const record = await this.find(id);
		if (!record) throw new NotFoundException();
	
		const oldRecord = { ...record }; // 既存のレコードをコピー
	
		record.name = name ?? record.name;
		record.email = email ?? record.email;
		record.password = password ?? record.password;
		record.description = description ?? record.description;
		record.birthday = birthday ?? record.birthday;
		record.updatedAt = new Date().toISOString();
	
    console.log(
      oldRecord.name === record.name &&
			oldRecord.email === record.email &&
			oldRecord.password === record.password &&
			oldRecord.description === record.description &&
			oldRecord.birthday === record.birthday 
    );


		// 更新する値がない場合は400エラーを返す
		if (
			oldRecord.name === record.name &&
			oldRecord.email === record.email &&
			oldRecord.password === record.password &&
			oldRecord.description === record.description &&
			oldRecord.birthday === record.birthday 
		) {
			throw new HttpException('No changes to update', HttpStatus.BAD_REQUEST);
		}
	
		await this.repository.save(record);
		return record;
	}
}
