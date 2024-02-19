import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from '../entities/record.entity';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

const mockData1 = {
  id: 1,
  material: 'test-material',
  learningTime: 90,
  description: 'test-description',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
const mockData2 = {
  id: 2,
  material: 'test-material2',
  learningTime: 90,
  description: 'test-description2',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
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

      const result = await controller.findAll();
      expect(result).toEqual(expectedRecords);
    });
  });

  describe('find', () => {
    it('200 Get a Record', async () => {
      const expectedRecord: Record = mockData1;

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
    it('200 Create a new record', async () => {
      const createRecordDto = {
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
      };
      const expectedRecord: Record = {
        id: 1,
        ...createRecordDto,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      jest
        .spyOn(service, 'create')
        .mockResolvedValue(expectedRecord);

      const result = await controller.create(createRecordDto);
      expect(result).toEqual(expectedRecord);
    });
  });

  describe('update', () => {
    it('200 Update a record', async () => {
      const updateRecordDto = {
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
      };
      const expectedRecord: Record = {
        id: 1,
        ...updateRecordDto,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue(expectedRecord);

      const result = await controller.update(1, updateRecordDto);
      expect(result).toEqual(expectedRecord);
    });

    it('404 Not Found', async () => {
      const updateRecordDto = {
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
      };
      const expectedResult = {
        message: "Not Found",
        statusCode: 404
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException(expectedResult.message));

      await expect(controller.update(0, updateRecordDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('200 Delete a record', async () => {
      const expectedRecord: Record = mockData1;

      jest
        .spyOn(service, 'remove')
        .mockResolvedValue(expectedRecord);

      const result = await controller.delete(1);
      expect(result).toEqual(expectedRecord);
    });

    it('404 Not Found', async () => {
      const expectedResult = {
        message: "Not Found",
        statusCode: 404
      };

      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new NotFoundException(expectedResult.message));

      await expect(controller.delete(0)).rejects.toThrow(NotFoundException);
    });
  });
});
