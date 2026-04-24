import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import { Veterinario } from './entities/veterinario.entity';

@Injectable()
export class VeterinariosService {
  constructor(
    @InjectRepository(Veterinario)
    private readonly veterinarioRepository: Repository<Veterinario>,
  ) {}

  create(createVeterinarioDto: CreateVeterinarioDto) {
    const veterinario = this.veterinarioRepository.create(createVeterinarioDto);
    return this.veterinarioRepository.save(veterinario);
  }

  findAll() {
    return this.veterinarioRepository.find();
  }

  async findOne(id: number) {
    const veterinario = await this.veterinarioRepository.findOneBy({
      id_veterinario: id,
    });
    if (!veterinario) {
      throw new NotFoundException(`Veterinario con ID #${id} no encontrado.`);
    }
    return veterinario;
  }

  async update(id: number, updateVeterinarioDto: UpdateVeterinarioDto) {
    const veterinario = await this.veterinarioRepository.preload({
      id_veterinario: id,
      ...updateVeterinarioDto,
    });
    if (!veterinario) {
      throw new NotFoundException(`Veterinario con ID #${id} no encontrado.`);
    }
    return this.veterinarioRepository.save(veterinario);
  }

  async remove(id: number) {
    const veterinario = await this.findOne(id);
    return this.veterinarioRepository.remove(veterinario);
  }
}
