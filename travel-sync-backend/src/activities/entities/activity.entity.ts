import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Trip } from '../../trips/entities/trip.entity';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Назва справи (напр. "Екскурсія")

  @Column({ default: false })
  isCompleted: boolean; // Виконано чи ні

  @ManyToOne(() => Trip, (trip) => trip.activities, { onDelete: 'CASCADE' })
  trip: Trip;

  @Column()
  tripId: string;
}