import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Record } from 'src/entities/record.entity';
import { Repository } from 'typeorm';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordsService } from './records.service';

const mockUuid1 = '00000000-0000-0000-0000-000000000001';
const mockUuid2 = '00000000-0000-0000-0000-000000000002';
const notExistUuid = '00000000-0000-0000-0000-000000000000';

const mockData1 = {
  id: mockUuid1,
  material: 'test-material',
  learningTime: 90,
  description: 'test-description',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  user: null,
};
const mockData2 = {
  id: mockUuid2,
  material: 'test-material2',
  learningTime: 90,
  description: 'test-description2',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  user: null,
};

describe('RecordsService', () => {
  let service: RecordsService;
  let repository: Repository<Record>;

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

    service = module.get<RecordsService>(RecordsService);
    repository = module.get<Repository<Record>>(getRepositoryToken(Record));
  });

  describe('findAll', () => {
    it('200 Find All Records', async () => {
      const expected = [ mockData1, mockData2 ];

      jest
        .spyOn(repository, 'find')
        .mockImplementation(async () => expected);
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
    it('201 Create a record', async () => {
      const expected = {...mockData1 };

      jest
        .spyOn(repository, 'create')
        .mockImplementation(() => expected);
      jest
        .spyOn(repository, 'save')
        .mockImplementation(async () => expected);

      const request = {
        material: 'test-material',
        learningTime: 90,
        description: 'test-description'
      }

      const result = await service.create(request);
      expect(result).toEqual(expected);
    });
  });

  describe('update', () => {
    it('200 Update all propaties', async () => {
      const beforeUpdated = {
        id: mockUuid1,
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
        user: null,
      };

      const afterUpdated = {
        id: mockUuid1,
        material: 'updated-material',
        learningTime: 900,
        description: 'updated-description',
        createdAt: beforeUpdated.createdAt,
        updatedAt: '2024-01-01T00:00:00.000Z',
        user: null,
      };
      
      const request: CreateRecordDto = {
        material: afterUpdated.material,
        learningTime: afterUpdated.learningTime,
        description: afterUpdated.description
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
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
        user: null,
      };

      const afterUpdated = {
        id: mockUuid1,
        material: 'updated-material',
        learningTime: 90,
        description: 'test-description',
        createdAt: beforeUpdated.createdAt,
        updatedAt: '2024-01-01T00:00:00.000Z',
        user: null,
      };
      
      const request: CreateRecordDto = {
        material: afterUpdated.material,
        learningTime: afterUpdated.learningTime,
        description: afterUpdated.description
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
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: null,
      };

      const afterUpdated = {
        id: mockUuid1,
        material: 'test-material',
        learningTime: 90,
        description: 'test-description',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: null,
      };
      
      const request: CreateRecordDto = {
        material: afterUpdated.material,
        learningTime: afterUpdated.learningTime,
        description: afterUpdated.description
      }

      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(async () => beforeUpdated);
      await expect(service.update(mockUuid1, request)).rejects.toThrow(
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
        .spyOn(repository, 'findOneBy')
        .mockImplementation(async () => null);
        await expect(service.update(notExistUuid, request)).rejects.toThrow(
          NotFoundException,
        );
    });
  });
  
  describe('remove', () => {
    it('200 Remove a record', async () => {
      const expected = { ...mockData1 };
  
      jest
        .spyOn(service, 'find')
        .mockImplementation(async () => expected);
      jest
        .spyOn(repository, 'remove')
        .mockImplementation(async () => expected);
  
      const result = await service.remove(mockUuid1);
      expect(result).toEqual(expected);
    });
  
    it('404 Not Found', async () => {
  
      jest
        .spyOn(service, 'find')
        .mockImplementation(async () => null);
  
      await expect(service.remove(notExistUuid)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});