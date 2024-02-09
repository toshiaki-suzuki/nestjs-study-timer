import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from '../entities/record.entity';
import { RecordsController } from './records.controller';
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

describe('RecordsController', () => {
  let controller: RecordsController;
  let service: RecordsService;
  let recordsRepository: Repository<Record>;

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
      const expectedRecords: Record[] = [mockRecord1, mockRecord2];

      jest
      .spyOn(service, 'findAll')
      .mockResolvedValue(expectedRecords);

      const result = await controller.findAll();
      expect(result).toEqual(expectedRecords);
    });
  });
});
