import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from '../entities/record.entity';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

const mockUuid1 = '00000000-0000-0000-0000-000000000001';
const mockUuid2 = '00000000-0000-0000-0000-000000000002';
const notExistUuid = '00000000-0000-0000-0000-000000000000';
const invalidFormatUuid = 'invalid'

const mockUser = {
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
const mockData1 = {
  id: mockUuid1,
  material: 'test-material',
  learningTime: 90,
  description: 'test-description',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  user: mockUser,
  userId: mockUser.id,
};
const mockData2 = {
  id: mockUuid2,
  material: 'test-material2',
  learningTime: 90,
  description: 'test-description2',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  user: mockUser,
  userId: mockUser.id,
};

describe('RecordsController', () => {
  let controller: RecordsController;
  let service: RecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordsController],
      providers: [
        RecordsService,
        {
          provide: getRepositoryToken(Record),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<RecordsController>(RecordsController);
    service = module.get<RecordsService>(RecordsService);
  });

  describe('findAll', () => {
    it('200 Get All Records', async () => {
      const expectedRecords: Record[] = [mockData1, mockData2];

      jest
      .spyOn(service, 'findAll')
      .mockResolvedValue(expectedRecords);

      const result = await controller.findAll(mockUser);
      expect(result).toEqual(expectedRecords);
    });
  });

  describe('find', () => {
    it('200 Get a Record', async () => {
      const expectedRecord: Record = mockData1;

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
    it('200 Create a new record', async () => {
      const createRecordDto = {
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
        user: mockUser,
        userId: mockUser.id,
      };
      const expectedRecord: Record = {
        id: mockUuid1,
        ...createRecordDto,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValue(expectedRecord);

      const result = await controller.create(createRecordDto, createRecordDto.user);
      expect(result).toEqual(expectedRecord);
    });
  });

  describe('update', () => {
    it('200 Update a record', async () => {
      const updateRecordDto = {
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
        user: mockUser,
        userId: mockUser.id,
      };
      const expectedRecord: Record = {
        id: mockUuid1,
        ...updateRecordDto,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: mockUser,
        userId: mockUser.id,
      };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue(expectedRecord);

      const result = await controller.update(mockUuid1, updateRecordDto);
      expect(result).toEqual(expectedRecord);
    });

    it('400 Invalid UUID format', async () => {
      const updateRecordDto = {
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
        user: mockUser,
        userId: mockUser.id,
      };
      const expectedResult = {
        message: "Validation failed (uuid is expected)",
        error: "Bad Request",
        statusCode: 400,
      }

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new BadRequestException(expectedResult.message));

      await expect(controller.update(invalidFormatUuid, updateRecordDto)).rejects.toThrow(BadRequestException);
    });

    it('404 Not Found', async () => {
      const updateRecordDto = {
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
        user: mockUser,
        userId: mockUser.id,
      };
      const expectedResult = {
        message: "Not Found",
        statusCode: 404
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException(expectedResult.message));

      await expect(controller.update(notExistUuid, updateRecordDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('200 Delete a record', async () => {
      const expectedRecord: Record = mockData1;

      jest
        .spyOn(service, 'remove')
        .mockResolvedValue(expectedRecord);

      const result = await controller.delete(mockUuid1);
      expect(result).toEqual(expectedRecord);
    });

    it('400 Invalid UUID format', async () => {
      const expectedResult = {
        message: "Validation failed (uuid is expected)",
        error: "Bad Request",
        statusCode: 400
      }

      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new BadRequestException(expectedResult.message));

      await expect(controller.delete(invalidFormatUuid)).rejects.toThrow(BadRequestException);
    });

    it('404 Not Found', async () => {
      const expectedResult = {
        message: "Not Found",
        statusCode: 404
      };

      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new NotFoundException(expectedResult.message));

      await expect(controller.delete(notExistUuid)).rejects.toThrow(NotFoundException);
    });
  });
});
