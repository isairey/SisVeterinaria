import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { Mascota } from './entities/mascota.entity';
import { PersonasService } from '../personas/personas.service';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
    private readonly personasService: PersonasService, // Inyectamos el servicio de personas
  ) {}

  async create(createMascotaDto: CreateMascotaDto) {
    // 1. Verificar que el dueño (persona) existe
    const persona = await this.personasService.findOne(
      createMascotaDto.id_persona,
    );
    if (!persona) {
      throw new NotFoundException(
        `No se encontró la persona con ID #${createMascotaDto.id_persona}`,
      );
    }

    // 2. Crear la mascota y asignarle el dueño
    const mascota = this.mascotaRepository.create({
      ...createMascotaDto,
      persona: persona, // Asignamos el objeto completo de la persona
    });

    return this.mascotaRepository.save(mascota);
  }

  findAll() {
    // Cargamos la relación con la persona para que se muestren sus datos
    return this.mascotaRepository.find({ relations: ['persona'] });
  }

  async findOne(id: number) {
    const mascota = await this.mascotaRepository.findOne({
      where: { id_mascota: id },
      relations: ['persona'],
    });
    if (!mascota) {
      throw new NotFoundException(`Mascota con ID #${id} no encontrada.`);
    }
    return mascota;
  }

  // El update y remove son similares al de personas
  async update(id: number, updateMascotaDto: UpdateMascotaDto) {
    const mascota = await this.mascotaRepository.preload({
      id_mascota: id,
      ...updateMascotaDto,
    });
    if (!mascota) {
      throw new NotFoundException(`Mascota con ID #${id} no encontrada.`);
    }
    return this.mascotaRepository.save(mascota);
  }

  async remove(id: number) {
    const mascota = await this.findOne(id);
    return this.mascotaRepository.remove(mascota);
  }
}
