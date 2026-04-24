// src/consultas/entities/consulta.entity.ts
import { Mascota } from '../../mascotas/entities/mascota.entity';
import { Veterinario } from '../../veterinarios/entities/veterinario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'consultas' })
export class Consulta {
  @PrimaryGeneratedColumn()
  id_consulta: number;

  // --- RELACIÓN 1 ---
  @ManyToOne(() => Mascota, (mascota) => mascota.consultas, { nullable: false })
  mascota: Mascota;

  // --- RELACIÓN 2 ---
  @ManyToOne(() => Veterinario, (veterinario) => veterinario.consultas, {
    nullable: false,
  })
  veterinario: Veterinario;

  @CreateDateColumn()
  fecha_consulta: Date;

  @Column({ type: 'text' })
  motivo_consulta: string;

  @Column({ type: 'text', nullable: true })
  diagnostico: string;

  // ... otros campos como tratamiento, temperatura, etc.
}
