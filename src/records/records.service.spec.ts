import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Record } from 'src/entities/record.entity';
import { Repository } from 'typeorm';
import { RecordsService } from './records.service';

const mockRecord1 = {
  id: 1,
  material: 'test-material',
  learningTime: 90,
  description: 'test-description'
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

  describe('find', () => {
    it('正常系', async () => {
      const expected = {
        ...mockRecord1,
        createdAt: '',
        updatedAt: '',
      };

      jest
        .spyOn(recordsRepository, 'findOneBy')
        .mockImplementation(async () => expected);
      const result = await recordsService.find(1);
      expect(result).toEqual(expected);
    });
  });
});
