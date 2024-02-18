import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

const mockRecord1 = {
  id: 1,
  name: 'test',
  email: 'test@example.com',
  password: 'password',
  description: 'Lorem ipsum',
  birthday: new Date('1990-01-01').toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
const mockRecord2 = {
  id: 2,
  name: 'test2',
  email: 'test2@example.com',
  password: 'password2',
  description: 'Lorem ipsum2',
  birthday: new Date('1991-01-01').toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findAll', () => {
    it('200 Find All Users', async () => {
      const expected: User[] = [
        { ...mockRecord1 },
        { ...mockRecord2 }
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(expected);

      const result = await service.findAll();

      expect(result).toEqual(expected);
    });
  });

  describe('create', () => {
    it('201 Create a user', async () => {
      const expected = {...mockRecord1 };

      jest
        .spyOn(repository, 'create')
        .mockImplementation(() => expected);
      jest
        .spyOn(repository, 'save')
        .mockImplementation(async () => expected);

      const request: CreateUserDto = {
        name: expected.name,
        email: expected.email,
        password: expected.password,
        description: expected.description,
        birthday: expected.birthday
      };

      const result = await service.create(request);
      expect(result).toEqual(expected);
    });
  });
});