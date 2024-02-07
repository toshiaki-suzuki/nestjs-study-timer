import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Record } from 'src/entities/record.entity';
import { Repository } from 'typeorm';
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
    it('200', async () => {
      const expected = [ mockRecord1, mockRecord2 ];

      jest
        .spyOn(recordsRepository, 'find')
        .mockImplementation(async () => expected);
      const result = await recordsService.findAll();
      expect(result).toEqual(expected);
    });
  });

  describe('find', () => {
    it('200', async () => {
      const expected = { ...mockRecord1 };

      jest
        .spyOn(recordsRepository, 'findOneBy')
        .mockImplementation(async () => expected);
      const result = await recordsService.find(1);
      expect(result).toEqual(expected);
    });
    
    it('404', async () => {
      jest
        .spyOn(recordsRepository, 'findOneBy')
        .mockImplementation(async () => null);
        await expect(recordsService.find(0)).rejects.toThrow(
          NotFoundException,
        );
    });
  });

  describe('create', () => {
    it('201', async () => {
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
});
