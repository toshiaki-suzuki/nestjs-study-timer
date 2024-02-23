import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return await this.service.signUp(signUpDto);
  }

  @Post('sign-in')
  async signIn(@Body() credentialsDto: CredentialsDto): Promise<{ token: string }> {
    return await this.service.signIn(credentialsDto);
  }
}
