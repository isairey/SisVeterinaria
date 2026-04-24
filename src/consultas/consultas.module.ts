import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';
import { Consulta } from './entities/consulta.entity';
import { MascotasModule } from '../mascotas/mascotas.module'; // <-- IMPORTAR
import { VeterinariosModule } from '../veterinarios/veterinarios.module'; // <-- IMPORTAR

@Module({
  imports: [
    TypeOrmModule.forFeature([Consulta]),
    MascotasModule,
    VeterinariosModule,
  ],
  controllers: [ConsultasController],
  providers: [ConsultasService],
})
export class ConsultasModule {}
