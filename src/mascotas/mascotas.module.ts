import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotasService } from './mascotas.service';
import { MascotasController } from './mascotas.controller';
import { Mascota } from './entities/mascota.entity';
import { PersonasModule } from '../personas/personas.module'; // <-- IMPORTANTE

@Module({
  imports: [
    TypeOrmModule.forFeature([Mascota]),
    PersonasModule, // <-- Para poder inyectar y usar el PersonasService
  ],
  controllers: [MascotasController],
  providers: [MascotasService],
  exports: [MascotasService],
})
export class MascotasModule {}
