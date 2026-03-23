import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Trip } from '../../trips/entities/trip.entity';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string; // За що заплатили (наприклад, "Таксі")

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number; // Скільки заплатили

  // Зв'язок: Багато витрат належать одній подорожі
  @ManyToOne(() => Trip, (trip) => trip.expenses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tripId' })
  trip: Trip;

  @Column()
  tripId: string; // Зберігаємо ID подорожі для зручності
}