// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PersonasService } from '../personas/personas.service';
import { Persona } from '../personas/entities/persona.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly personasService: PersonasService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ESTO_ES_UN_SECRETO_TEMPORAL', // ¡DEBE ser el mismo secreto que en auth.module!
    });
  }

  // Este método se ejecuta AUTOMÁTICAMENTE después de que el token se valida.
  // El 'payload' es el contenido decodificado del token: { id: ..., dni: ... }
  async validate(payload: {
    id: number;
    dni: string;
  }): Promise<Omit<Persona, 'password'>> {
    // ANTES: const persona = await this.personasService.findOne(payload.id);
    // AHORA:
    const persona = await this.personasService.findByIdForAuth(payload.id); // <-- ¡LÍNEA CORREGIDA!

    if (!persona) {
      throw new UnauthorizedException('Token no válido o usuario no existe.');
    }

    // Lo que retornamos aquí se inyectará en el objeto `request.user` de nuestros controladores.
    // ¡Por seguridad, eliminamos la contraseña antes de devolverlo!
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = persona;
    return user;
  }
}
