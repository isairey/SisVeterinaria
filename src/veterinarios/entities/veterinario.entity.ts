// src/veterinarios/entities/veterinario.entity.ts
import { Consulta } from '../../consultas/entities/consulta.entity'; // <-- ¡IMPORTANTE! Añadir esta importación
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'veterinarios' })
export class Veterinario {
  @PrimaryGeneratedColumn()
  id_veterinario: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  licencia: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  apellido: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  especialidad: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: true })
  email: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // --- ¡LA PIEZA QUE FALTABA! LA RELACIÓN INVERSA ---
  @OneToMany(() => Consulta, (consulta) => consulta.veterinario)
  consultas: Consulta[];
}
