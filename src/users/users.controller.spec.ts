import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersController } from './users.controller';
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
        { ...mockRecord1 },
        { ...mockRecord2 }
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expected);

      const result = await controller.findAll();
      expect(result).toEqual(expected);
    });
  });

  describe('find', () => {
    it('200 Get a Record', async () => {
      const expectedRecord: User = mockRecord1;

      jest
      .spyOn(service, 'find')
      .mockResolvedValue(expectedRecord);

      const result = await controller.find(1);
      expect(result).toEqual(expectedRecord);
    });

    it('404 Not Found', async () => {
      const expectedResult = {
        message: "Not Found",
        statusCode: 404
      };
  
      jest
        .spyOn(service, 'find')
        .mockRejectedValue(new NotFoundException(expectedResult.message));
  
      await expect(controller.find(0)).rejects.toThrow(NotFoundException);
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
      };
      const expectedUser: User = {
        id: 1,
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
      };
      const expected: User = {
        id: 1,
        ...updateUserDto,
        createdAt: mockRecord1.createdAt,
        updatedAt: new Date().toISOString(),
      };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue(expected);

      const result = await controller.update(1, updateUserDto);
      expect(result).toEqual(expected);
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

      await expect(controller.update(0, updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

});
