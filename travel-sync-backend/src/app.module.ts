import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsModule } from './trips/trips.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'mac', 
      password: '',
      database: 'travelsync', 
      autoLoadEntities: true,
      synchronize: true,
    }),
    TripsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}