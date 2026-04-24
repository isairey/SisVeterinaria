import { Test, TestingModule } from '@nestjs/testing';
import { VeterinariosService } from './veterinarios.service';

describe('VeterinariosService', () => {
  let service: VeterinariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeterinariosService],
    }).compile();

    service = module.get<VeterinariosService>(VeterinariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
