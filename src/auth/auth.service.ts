import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CredentialsDto } from './dto/credentials.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
		private jwtService: JwtService
  ) {}

	async signUp(signUpDto: SignUpDto): Promise<User> {
		const { email } = signUpDto;


		const found = await this.repository.findOneBy({ email });
		if (found) throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const { name, password, description, birthday } = signUpDto;
		const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
		const user = await this.repository.create({
      name,
      email,
      password: hashedPassword,
      description,
      birthday,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    await this.repository.save(user);
    return user
	}

	async signIn(credentialsDto: CredentialsDto): Promise<{ token: string }> {
		const { email, password } = credentialsDto;

		const user = await this.repository.findOneBy({ email });
		if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

		const payload = {
			id: user.id, 
			email: user.email
		};
		const token = this.jwtService.sign(payload);
		return { token };
	}
}
