// src/personas/entities/persona.entity.ts
import { Mascota } from '../../mascotas/entities/mascota.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'personas' })
export class Persona {
  @PrimaryGeneratedColumn()
  id_persona: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  dni: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  apellido: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @Column({ type: 'text', nullable: true })
  direccion: string;

  // --- CAMPO PASSWORD AÑADIDO ---
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // --- RELACIÓN INVERSA CON MASCOTAS ---
  @OneToMany(() => Mascota, (mascota) => mascota.persona)
  mascotas: Mascota[];
}
