import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from './trips/trips.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ActivitiesModule } from './activities/activities.module';
import { User } from './users/entities/user.entity';
import { Trip } from './trips/entities/trip.entity';
import { Expense } from './expenses/entities/expense.entity';
import { Activity } from './activities/entities/activity.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Якщо в системі є змінна DB_HOST, беремо її, інакше 'localhost'
      host: process.env.DB_HOST || 'localhost', 
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '', 
      database: process.env.DB_NAME || 'travelsync',
      entities: [User, Trip, Expense, Activity], 
      synchronize: true,
}),
    TripsModule,
    UsersModule,
    AuthModule,
    ExpensesModule,
    ActivitiesModule,
  ],
})
export class AppModule {}