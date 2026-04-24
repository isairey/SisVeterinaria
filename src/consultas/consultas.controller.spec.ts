import { Test, TestingModule } from '@nestjs/testing';
import { ConsultasController } from './consultas.controller';

describe('ConsultasController', () => {
  let controller: ConsultasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultasController],
    }).compile();

    controller = module.get<ConsultasController>(ConsultasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
