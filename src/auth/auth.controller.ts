import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
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
