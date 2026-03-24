import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, Generated, ManyToOne } from 'typeorm';
import { Expense } from '../../expenses/entities/expense.entity'; 
import { Activity } from 'src/activities/entities/activity.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column()
  @Generated('uuid')
  shareId: string;

  @Column({ default: 'USD' })
  baseCurrency: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Expense, (expense) => expense.trip)
  expenses: Expense;

  @OneToMany(() => Activity, (activity) => activity.trip)
  activities: Activity[];

  @ManyToOne(() => User, (user) => user.trips)
  user: User;

  @Column()
  userId: string;
}