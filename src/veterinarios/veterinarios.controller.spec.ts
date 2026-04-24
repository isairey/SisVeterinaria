import { Test, TestingModule } from '@nestjs/testing';
import { VeterinariosController } from './veterinarios.controller';

describe('VeterinariosController', () => {
  let controller: VeterinariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeterinariosController],
    }).compile();

    controller = module.get<VeterinariosController>(VeterinariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
