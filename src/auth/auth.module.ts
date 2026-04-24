import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PersonasModule } from '../personas/personas.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; // <-- IMPORTACIÓN AÑADIDA

@Module({
  imports: [
    PersonasModule, // Para poder usar el PersonasService
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'ESTO_ES_UN_SECRETO_TEMPORAL', // ¡MUY IMPORTANTE! Esto DEBE ir a un archivo .env
      signOptions: { expiresIn: '1h' }, // El token expira en 1 hora
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // <-- JwtStrategy AÑADIDO AQUÍ
})
export class AuthModule {}
