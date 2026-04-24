import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  // ---- MÉTODOS PÚBLICOS DEL CRUD ----

  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    const persona = this.personaRepository.create(createPersonaDto);
    return this.personaRepository.save(persona);
  }

  async findAll(): Promise<Omit<Persona, 'password'>[]> {
    const personas = await this.personaRepository.find();
    // Mapeamos la lista para eliminar la contraseña de cada objeto
    return personas.map((persona) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = persona;
      return result;
    });
  }

  async findOne(id: number): Promise<Omit<Persona, 'password'>> {
    const persona = await this.personaRepository.findOneBy({ id_persona: id });
    if (!persona) {
      throw new NotFoundException(`Persona con ID #${id} no encontrada.`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = persona;
    return result;
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    // Nota: El DTO de actualización no debería permitir cambiar la contraseña aquí.
    // Eso requeriría un endpoint y un DTO separados.
    const persona = await this.personaRepository.preload({
      id_persona: id,
      ...updatePersonaDto,
    });
    if (!persona) {
      throw new NotFoundException(`Persona con ID #${id} no encontrada.`);
    }
    return this.personaRepository.save(persona);
  }

  async remove(id: number) {
    const persona = await this.findOne(id); // findOne ya no devuelve la contraseña
    return this.personaRepository.remove(persona as Persona);
  }

  // ---- MÉTODOS INTERNOS PARA AUTENTICACIÓN ----

  /**
   * Este método es para uso interno del AuthModule.
   * Devuelve la entidad Persona completa, incluyendo la contraseña hasheada.
   * ¡NUNCA expongas este método directamente en el controlador!
   */
  async findOneByDni(dni: string): Promise<Persona> {
    const persona = await this.personaRepository.findOneBy({ dni });
    if (!persona) {
      throw new UnauthorizedException(
        'Credenciales inválidas (DNI no encontrado)',
      );
    }
    return persona;
  }

  /**
   * Este método es para uso interno del sistema de autenticación (JWT Strategy).
   * Devuelve la entidad Persona completa para su validación.
   * ¡NUNCA expongas este método directamente en el controlador!
   */
  async findByIdForAuth(id: number): Promise<Persona | null> {
    return this.personaRepository.findOneBy({ id_persona: id });
  }
}
