import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('trips') 
export class Trip {
  @PrimaryGeneratedColumn('uuid') // Генерація унікального ID
  id: string;

  @Column()
  title: string;

  @Column({ default: 'USD' })
  baseCurrency: string;

  @CreateDateColumn()
  createdAt: Date;
}