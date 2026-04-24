import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PersonasService } from './personas.service';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Controller('personas')
@UseGuards(AuthGuard('jwt'))
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  // El método @Post() create() ha sido ELIMINADO.
  // La creación de usuarios ahora solo se maneja en AuthController.

  @Get()
  findAll() {
    return this.personasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.personasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonaDto: UpdatePersonaDto,
  ) {
    return this.personasService.update(id, updatePersonaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.personasService.remove(id);
  }
}
