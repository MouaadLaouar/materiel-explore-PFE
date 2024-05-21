import { Test, TestingModule } from '@nestjs/testing';
import { BorrowMaterialService } from './borrow-material.service';

describe('BorrowMaterialService', () => {
  let service: BorrowMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowMaterialService],
    }).compile();

    service = module.get<BorrowMaterialService>(BorrowMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
