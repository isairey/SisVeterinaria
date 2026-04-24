import { PartialType } from '@nestjs/mapped-types';
import { CreateMascotaDto } from './create-mascota.dto';

export class UpdateMascotaDto extends PartialType(CreateMascotaDto) {}
