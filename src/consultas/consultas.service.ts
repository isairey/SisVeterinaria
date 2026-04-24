import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { Consulta } from './entities/consulta.entity';
import { MascotasService } from '../mascotas/mascotas.service';
import { VeterinariosService } from '../veterinarios/veterinarios.service';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
    private readonly mascotasService: MascotasService,
    private readonly veterinariosService: VeterinariosService,
  ) {}

  async create(createConsultaDto: CreateConsultaDto) {
    // 1. Verificar que la mascota y el veterinario existan
    const mascota = await this.mascotasService.findOne(
      createConsultaDto.id_mascota,
    );
    const veterinario = await this.veterinariosService.findOne(
      createConsultaDto.id_veterinario,
    );

    // 2. Crear la consulta y asignar las entidades completas
    const consulta = this.consultaRepository.create({
      ...createConsultaDto,
      mascota: mascota,
      veterinario: veterinario,
    });

    return this.consultaRepository.save(consulta);
  }

  findAll() {
    // Cargamos las relaciones para ver los datos completos de mascota y veterinario
    return this.consultaRepository.find({
      relations: ['mascota', 'veterinario'],
    });
  }

  // ... findOne, update y remove seguirían un patrón similar
}
