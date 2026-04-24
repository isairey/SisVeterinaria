// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PersonasService } from '../personas/personas.service';
import { CreatePersonaDto } from '../personas/dto/create-persona.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly personasService: PersonasService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createPersonaDto: CreatePersonaDto) {
    const hashedPassword = await bcrypt.hash(createPersonaDto.password, 10);

    const persona = await this.personasService.create({
      ...createPersonaDto,
      password: hashedPassword,
    });

    // Manera segura de devolver el objeto sin la contraseña
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = persona;
    return result;
  }

  async login(loginDto: { dni: string; pass: string }) {
    const persona = await this.personasService.findOneByDni(loginDto.dni);

    const isPasswordMatching = await bcrypt.compare(
      loginDto.pass,
      persona.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciales inválidas (contraseña)');
    }

    const payload = { id: persona.id_persona, dni: persona.dni };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
