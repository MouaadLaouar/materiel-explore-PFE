import { Test, TestingModule } from '@nestjs/testing';
import { BorrowMaterialController } from './borrow-material.controller';

describe('BorrowMaterialController', () => {
  let controller: BorrowMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowMaterialController],
    }).compile();

    controller = module.get<BorrowMaterialController>(BorrowMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
