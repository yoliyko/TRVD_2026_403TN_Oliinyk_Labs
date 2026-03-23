import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Expense } from '../../expenses/entities/expense.entity'; 
import { Activity } from 'src/activities/entities/activity.entity';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: 'USD' })
  baseCurrency: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Expense, (expense) => expense.trip)
  expenses: Expense;

  @OneToMany(() => Activity, (activity) => activity.trip)
  activities: Activity;
}