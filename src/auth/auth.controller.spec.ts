import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { SignUpDto } from './dto/sign-up.dto';

const mockUuid1 = '00000000-0000-0000-0000-000000000001';

const mockData1 = {
  id: mockUuid1,
  name: 'test',
  email: 'test@example.com',
  password: 'password',
  description: 'Lorem ipsum',
  birthday: new Date('1990-01-01').toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  records: [],
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    // UserRepositoryとJwtServiceのモックを作成
    const mockUserRepository = {};
    const mockJwtService = { sign: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        // AuthServiceが依存しているUserRepositoryとJwtServiceのモックを提供
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('201 sign up success', async () => {
      const signUpDto: SignUpDto = {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        description: 'Lorem ipsum',
        birthday: new Date('1990-01-01').toISOString(),
      };
      const expectedResult: User = mockData1;
      
      jest.spyOn(service, 'signUp')
          .mockResolvedValue(expectedResult);

      const result = await controller.signUp(signUpDto);

      expect(result).toBe(expectedResult);
    });
  });

  describe('signIn', () => {
    it('201 sign in success', async () => {
      const credentialsDto: CredentialsDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const expected = { token: 'token' };
      jest.spyOn(service, 'signIn')
          .mockImplementation(async () => expected);

      const result = await controller.signIn(credentialsDto);

      expect(service.signIn).toHaveBeenCalledWith(credentialsDto);
      expect(result).toEqual(expected);
    });
  });
});