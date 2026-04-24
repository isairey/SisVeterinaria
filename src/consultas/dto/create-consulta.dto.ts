import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateConsultaDto {
  @IsInt()
  @IsPositive()
  id_mascota: number;

  @IsInt()
  @IsPositive()
  id_veterinario: number;

  @IsString()
  @IsNotEmpty()
  motivo_consulta: string;
}
