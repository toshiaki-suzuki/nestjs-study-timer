import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import UsersController from './users.controller';
import { UsersService } from './users.service';

const mockUuid1 = '00000000-0000-0000-0000-000000000001';
const mockUuid2 = '00000000-0000-0000-0000-000000000002';
const notExistUuid = '00000000-0000-0000-0000-000000000000';
const invalidFormatUuid = 'invalid'

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
  records: [],
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('200 Find All Users', async () => {
      const expected: User[] = [
        { ...mockData1 },
        { ...mockData2 }
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expected);

      const result = await controller.findAll();
      expect(result).toEqual(expected);
    });
  });

  describe('find', () => {
    it('200 Get a Record', async () => {
      const expectedRecord: User = mockData1;

      jest
      .spyOn(service, 'find')
      .mockResolvedValue(expectedRecord);

      const result = await controller.find(mockUuid1);
      expect(result).toEqual(expectedRecord);
    });

    it('400 Invalid UUID format', async () => {
      const expectedResult = {
        message: "Validation failed (uuid is expected)",
        error: "Bad Request",
        statusCode: 400
      }
  
      jest
        .spyOn(service, 'find')
        .mockRejectedValue(new BadRequestException(expectedResult.message));
  
      await expect(controller.find(invalidFormatUuid)).rejects.toThrow(BadRequestException);
    });

    it('404 Not Found', async () => {
      const expectedResult = {
        message: "Not Found",
        statusCode: 404
      };
  
      jest
        .spyOn(service, 'find')
        .mockRejectedValue(new NotFoundException(expectedResult.message));
  
      await expect(controller.find(notExistUuid)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('201 Create a new record', async () => {
      const createUserDto = {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        description: 'Lorem ipsum',
        birthday: new Date('1990-01-01').toISOString(),
        records: [],
      };
      const expectedUser: User = {
        id: mockUuid1,
        ...createUserDto,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValue(expectedUser);

      const result = await controller.create(createUserDto);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('update', () => {
    it('200 Update a record', async () => {
      const updateUserDto = {
        name: 'updated',
        email: 'updated@example.com',
        password: 'updatedpassword',
        description: 'updated description',
        birthday: new Date('2000-01-01').toISOString(),
        records: [],
      };
      const expected: User = {
        id: mockUuid1,
        ...updateUserDto,
        createdAt: mockData1.createdAt,
        updatedAt: new Date().toISOString(),
      };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue(expected);

      const result = await controller.update(mockUuid1, updateUserDto);
      expect(result).toEqual(expected);
    });

    it('400 Invalid UUID format', async () => {
      const updateUserDto = {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        description: 'Lorem ipsum',
        birthday: new Date('1990-01-01').toISOString(),
      };
      const expectedResult = {
        message: "Validation failed (uuid is expected)",
        error: "Bad Request",
        statusCode: 400
      }
  
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new BadRequestException(expectedResult.message));
  
      await expect(controller.update(invalidFormatUuid, updateUserDto)).rejects.toThrow(BadRequestException);
    });

    it('404 Not Found', async () => {
      const updateUserDto = {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
        description: 'Lorem ipsum',
        birthday: new Date('1990-01-01').toISOString(),
      };
      const expectedResult = {
        message: "Not Found",
        statusCode: 404
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException(expectedResult.message));

      await expect(controller.update(notExistUuid, updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('200 Delete a record', async () => {
      const expected: User = mockData1;

      jest
        .spyOn(service, 'delete')
        .mockResolvedValue(expected);

      const result = await controller.delete(mockUuid1);
      expect(result).toEqual(expected);
    });

    it('400 Invalid UUID format', async () => {
      const expectedResult = {
        message: "Validation failed (uuid is expected)",
        error: "Bad Request",
        statusCode: 400
      }
  
      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(new BadRequestException(expectedResult.message));
  
      await expect(controller.delete(invalidFormatUuid)).rejects.toThrow(BadRequestException);
    });

    it('404 Not Found', async () => {
      const expectedResult = {
        message: "Not Found",
        statusCode: 404
      };

      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(new NotFoundException(expectedResult.message));

      await expect(controller.delete(notExistUuid)).rejects.toThrow(NotFoundException);
    });
  });
});
