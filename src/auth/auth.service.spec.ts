import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { SignUpDto } from './dto/sign-up.dto';

const mockUuid1 = '00000000-0000-0000-0000-000000000001';
const mockUuid2 = '00000000-0000-0000-0000-000000000002';

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
const mockData2 = {
  id: mockUuid2,
  name: 'test2',
  email: 'test2@example.com',
  password: 'password2',
  description: 'Lorem ipsum2',
  birthday: new Date('1991-01-01').toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  records: []
};

describe('AuthService', () => {
  let service: AuthService;
  let repository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signUp', () => {
    it('201 sign up a new user', async () => {
      const signUpDto: SignUpDto = {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        description: 'Lorem ipsum',
        birthday: new Date('1990-01-01').toISOString(),
      };

      const expected = { ...mockData1 };

      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(async () => null);
      jest
        .spyOn(repository, 'create')
        .mockImplementation(() => expected);
      jest
        .spyOn(repository, 'save')
        .mockImplementation(async () => expected);
      
      const result = await service.signUp(signUpDto);
      expect(result).toEqual(expected);
    });

    it('409 user already exists', async () => {
      const signUpDto: SignUpDto = {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        description: 'Lorem ipsum',
        birthday: new Date('1990-01-01').toISOString(),
      };

      const expected = {...mockData1 };
      jest.spyOn(repository, 'findOneBy')
          .mockImplementation(async () => expected);
          
      await expect(service.signUp(signUpDto)).rejects.toThrow(
        new HttpException('User already exists', HttpStatus.CONFLICT),
      );
    });
  });

  describe('signIn', () => {
    it('201 return a token', async () => {
      const credentialsDto: CredentialsDto = {
        email: 'test@example.com',
        password: 'password',
      };

      jest.spyOn(repository, 'findOneBy')
          .mockImplementation(async () => mockData1);
      jest.spyOn(bcrypt, 'compare')
          .mockImplementation(async () => true);
      jest.spyOn(jwtService, 'sign')
          .mockReturnValueOnce('token');

      const result = await service.signIn(credentialsDto);
      expect(result).toEqual({ token: 'token' });
    });

    it('404 NotFound', async () => {
      const credentialsDto: CredentialsDto = {
        email: 'noUser@example.com',
        password: 'password',
      };

      jest.spyOn(repository, 'findOneBy')
          .mockImplementation(async () => null);

      await expect(service.signIn(credentialsDto)).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
    });

    it('401 invalid credentials', async () => {
      const credentialsDto: CredentialsDto = {
        email: 'test@example.com',
        password: 'password',
      };

      jest.spyOn(repository, 'findOneBy')
          .mockImplementation(async () => mockData1);
      jest.spyOn(bcrypt, 'compare')
          .mockImplementation(async () => false);

      await expect(service.signIn(credentialsDto)).rejects.toThrow(
        new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED),
      );
    });
  });
});