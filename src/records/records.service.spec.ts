import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Record } from 'src/entities/record.entity';
import { Repository } from 'typeorm';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordsService } from './records.service';

const mockRecord1 = {
  id: 1,
  material: 'test-material',
  learningTime: 90,
  description: 'test-description',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
const mockRecord2 = {
  id: 2,
  material: 'test-material2',
  learningTime: 90,
  description: 'test-description2',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('RecordsService', () => {
  let recordsService: RecordsService;
  let recordsRepository: Repository<Record>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecordsService,
        {
          provide: getRepositoryToken(Record),
          useClass: Repository,
        },
      ],
    }).compile();

    recordsService = module.get<RecordsService>(RecordsService);
    recordsRepository = module.get<Repository<Record>>(getRepositoryToken(Record));
  });

  describe('findAll', () => {
    it('200 Find All Records', async () => {
      const expected = [ mockRecord1, mockRecord2 ];

      jest
        .spyOn(recordsRepository, 'find')
        .mockImplementation(async () => expected);
      const result = await recordsService.findAll();
      expect(result).toEqual(expected);
    });
  });

  describe('find', () => {
    it('200 Find a record', async () => {
      const expected = { ...mockRecord1 };

      jest
        .spyOn(recordsRepository, 'findOneBy')
        .mockImplementation(async () => expected);
      const result = await recordsService.find(1);
      expect(result).toEqual(expected);
    });
    
    it('404 Not Found', async () => {
      jest
        .spyOn(recordsRepository, 'findOneBy')
        .mockImplementation(async () => null);
        await expect(recordsService.find(0)).rejects.toThrow(
          NotFoundException,
        );
    });
  });

  describe('create', () => {
    it('201 Create a record', async () => {
      const expected = {...mockRecord1 };

      jest
        .spyOn(recordsRepository, 'create')
        .mockImplementation(() => expected);
      jest
        .spyOn(recordsRepository, 'save')
        .mockImplementation(async () => expected);

      const request = {
        material: 'test-material',
        learningTime: 90,
        description: 'test-description'
      }

      const result = await recordsService.create(request);
      expect(result).toEqual(expected);
    });
  });

  describe('update', () => {
    it('200 Update all propaties', async () => {
      const beforeUpdated = {
        id: 1,
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z'
      };

      const afterUpdated = {
        id: 1,
        material: 'updated-material',
        learningTime: 900,
        description: 'updated-description',
        createdAt: beforeUpdated.createdAt,
        updatedAt: '2024-01-01T00:00:00.000Z',
      };
      
      const request: CreateRecordDto = {
        material: afterUpdated.material,
        learningTime: afterUpdated.learningTime,
        description: afterUpdated.description
      }

      jest
        .spyOn(recordsRepository, 'findOneBy')
        .mockImplementation(async () => beforeUpdated);
      Date.prototype.toISOString = jest.fn(() => '2024-01-01T00:00:00.000Z');
      jest
        .spyOn(recordsRepository, 'save')
        .mockImplementation(async () => afterUpdated);
      const result = await recordsService.update(1, request);
      expect(result).toEqual(afterUpdated);
    });

    it('200 Update a single propatiy', async () => {
      const beforeUpdated = {
        id: 1,
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z'
      };

      const afterUpdated = {
        id: 1,
        material: 'updated-material',
        learningTime: 90,
        description: 'test-description',
        createdAt: beforeUpdated.createdAt,
        updatedAt: '2024-01-01T00:00:00.000Z',
      };
      
      const request: CreateRecordDto = {
        material: afterUpdated.material,
        learningTime: afterUpdated.learningTime,
        description: afterUpdated.description
      }

      jest
        .spyOn(recordsRepository, 'findOneBy')
        .mockImplementation(async () => beforeUpdated);
      Date.prototype.toISOString = jest.fn(() => '2024-01-01T00:00:00.000Z');
      jest
        .spyOn(recordsRepository, 'save')
        .mockImplementation(async () => afterUpdated);
      const result = await recordsService.update(1, request);
      expect(result).toEqual(afterUpdated);
    });

    it('400 Update no propatiy', async () => {
      const beforeUpdated = {
        id: 1,
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const afterUpdated = {
        id: 1,
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const request: CreateRecordDto = {
        material: afterUpdated.material,
        learningTime: afterUpdated.learningTime,
        description: afterUpdated.description
      }

      jest
        .spyOn(recordsRepository, 'findOneBy')
        .mockImplementation(async () => beforeUpdated);
      await expect(recordsService.update(1, request)).rejects.toThrow(
        new HttpException('No changes to update', HttpStatus.BAD_REQUEST),
      );
    });

    it('404 Not Found', async () => {
      const request: CreateRecordDto = {
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
      }
      jest
        .spyOn(recordsRepository, 'findOneBy')
        .mockImplementation(async () => null);
        await expect(recordsService.update(0, request)).rejects.toThrow(
          NotFoundException,
        );
    });
  });
  
  describe('remove', () => {
    it('200 Remove a record', async () => {
      const recordId = 1;
      const expected = { ...mockRecord1 };
  
      jest
        .spyOn(recordsService, 'find')
        .mockImplementation(async () => expected);
      jest
        .spyOn(recordsRepository, 'remove')
        .mockImplementation(async () => expected);
  
      const result = await recordsService.remove(recordId);
      expect(result).toEqual(expected);
    });
  
    it('404 Not Found', async () => {
      const recordId = 0;
  
      jest
        .spyOn(recordsService, 'find')
        .mockImplementation(async () => null);
  
      await expect(recordsService.remove(recordId)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});