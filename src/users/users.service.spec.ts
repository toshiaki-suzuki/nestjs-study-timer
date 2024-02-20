import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

const mockUuid1 = '00000000-0000-0000-0000-000000000001';
const mockUuid2 = '00000000-0000-0000-0000-000000000002';
const notExistUuid = '00000000-0000-0000-0000-000000000000';

const mockData1 = {
  id: mockUuid1,
  name: 'test',
  email: 'test@example.com',
  password: 'password',
  description: 'Lorem ipsum',
  birthday: new Date('1990-01-01').toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
const mockData2 = {
  id: mockUuid2,
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
        { ...mockData1 },
        { ...mockData2 }
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(expected);

      const result = await service.findAll();

      expect(result).toEqual(expected);
    });
  });

  describe('find', () => {
    it('200 Find a record', async () => {
      const expected = { ...mockData1 };

      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(async () => expected);
      const result = await service.find(mockUuid1);
      expect(result).toEqual(expected);
    });
    
    it('404 Not Found', async () => {
      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(async () => null);
        await expect(service.find(notExistUuid)).rejects.toThrow(
          NotFoundException,
        );
    });
  });

  describe('create', () => {
    it('201 Create a user', async () => {
      const expected = {...mockData1 };

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

  describe('update', () => {
    it('200 Update all propaties', async () => {
      const beforeUpdated = {
        id: mockUuid1,
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        description: 'Lorem ipsum',
        birthday: new Date('1990-01-01').toISOString(),
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z'
      };

      const afterUpdated = {
        id: mockUuid1,
        name: 'updated',
        email: 'updated@example.com',
        password: 'updatedpassword',
        description: 'updated description',
        birthday: new Date('2000-12-31').toISOString(),
        createdAt: beforeUpdated.createdAt,
        updatedAt: '2024-01-01T00:00:00.000Z',
      };
      
      const request: CreateUserDto = {
        name: afterUpdated.name,
        email: afterUpdated.email,
        password: afterUpdated.password,
        description: afterUpdated.description,
        birthday: afterUpdated.birthday,
      }

      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(async () => beforeUpdated);
      Date.prototype.toISOString = jest.fn(() => '2024-01-01T00:00:00.000Z');
      jest
        .spyOn(repository, 'save')
        .mockImplementation(async () => afterUpdated);
      const result = await service.update(mockUuid1, request);
      expect(result).toEqual(afterUpdated);
    });

    it('200 Update a single propatiy', async () => {
      const beforeUpdated = {
        id: mockUuid1,
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        description: 'Lorem ipsum',
        birthday: new Date('1990-01-01').toISOString(),
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z'
      };

      const afterUpdated = {
        id: mockUuid1,
        name: 'updated',
        email: 'test@example.com',
        password: 'password',
        description: 'Lorem ipsum',
        birthday: new Date('1990-01-01').toISOString(),
        createdAt: beforeUpdated.createdAt,
        updatedAt: '2024-01-01T00:00:00.000Z',
      };
      
      const request: CreateUserDto = {
        name: afterUpdated.name,
        email: afterUpdated.email,
        password: afterUpdated.password,
        description: afterUpdated.description,
        birthday: afterUpdated.birthday,
      }

      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(async () => beforeUpdated);
      Date.prototype.toISOString = jest.fn(() => '2024-01-01T00:00:00.000Z');
      jest
        .spyOn(repository, 'save')
        .mockImplementation(async () => afterUpdated);
      const result = await service.update(mockUuid1, request);
      expect(result).toEqual(afterUpdated);
    });

    it('400 Update no propatiy', async () => {
      const beforeUpdated = {
        id: mockUuid1,
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        description: 'Lorem ipsum',
        birthday: '1990-01-01T00:00:00.000Z',
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z'
      };
      
      const request: CreateUserDto = {
        name: beforeUpdated.name,
        email: beforeUpdated.email,
        password: beforeUpdated.password,
        description: beforeUpdated.description,
        birthday: beforeUpdated.birthday,
      }

      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(async () => beforeUpdated);
      await expect(service.update(mockUuid1, request)).rejects.toThrow(
        new HttpException('No changes to update', HttpStatus.BAD_REQUEST),
      );
    });

    it('404 Not Found', async () => {
      const request: CreateUserDto = {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        description: 'Lorem ipsum',
        birthday: new Date('1990-01-01').toISOString(),
      }
      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(async () => null);
        await expect(service.update(notExistUuid, request)).rejects.toThrow(
          NotFoundException,
        );
    });
  });

  describe('delete', () => {
    it('200 Delete a record', async () => {
      const expected = { ...mockData1 };
      jest
        .spyOn(service, 'find')
        .mockImplementation(async () => expected);
      jest
        .spyOn(repository, 'remove')
        .mockImplementation(async () => expected);
  
      const result = await service.delete(mockUuid1);
      expect(result).toEqual(expected);
    });
  
    it('404 Not Found', async () => {
      jest
        .spyOn(service, 'find')
        .mockImplementation(async () => null);
  
      await expect(service.delete(notExistUuid)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});