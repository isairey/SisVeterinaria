import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatePersonaDto } from '../personas/dto/create-persona.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createPersonaDto: CreatePersonaDto) {
    return this.authService.register(createPersonaDto);
  }

  @Post('login')
  login(@Body() loginDto: { dni: string; pass: string }) {
    return this.authService.login(loginDto);
  }
}
