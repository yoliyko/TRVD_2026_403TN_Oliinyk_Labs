import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm'; // Додай цей імпорт
import { JwtStrategy } from './jwt.strategy';
import { RtStrategy } from './rt.strategy';
import { AdminController } from './admin.controller'; // Імпорт адмін-контролера
import { jwtConstants } from './constants';

// Імпортуй сутності для бази даних
import { User } from '../users/entities/user.entity';
import { Trip } from '../trips/entities/trip.entity';
import { Expense } from '../expenses/entities/expense.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([User, Trip, Expense]), 
    JwtModule.register({
      secret:jwtConstants.secret, 
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, RtStrategy],
  controllers: [AuthController, AdminController], // Обидва контролери тут
  exports: [AuthService],
})
export class AuthModule {}




