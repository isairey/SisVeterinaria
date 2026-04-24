import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeterinariosService } from './veterinarios.service';
import { VeterinariosController } from './veterinarios.controller';
import { Veterinario } from './entities/veterinario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Veterinario])],
  controllers: [VeterinariosController],
  providers: [VeterinariosService],
  exports: [VeterinariosService],
})
export class VeterinariosModule {}
