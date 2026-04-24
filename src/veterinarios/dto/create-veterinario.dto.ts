import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateVeterinarioDto {
  @IsString()
  @IsNotEmpty()
  licencia: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsOptional()
  especialidad?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
