import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateMascotaDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  id_persona: number; // ¡Necesitamos saber de quién es la mascota!

  @IsString()
  @IsNotEmpty()
  nombre_mascota: string;

  @IsString()
  @IsNotEmpty()
  tipo_animal: string;
}
