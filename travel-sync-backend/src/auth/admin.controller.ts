import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

// Імпорти сутностей (перевір шляхи, якщо вони відрізняються)
import { User, UserRole } from '../users/entities/user.entity';
import { Trip } from '../trips/entities/trip.entity';
import { Expense } from '../expenses/entities/expense.entity';

// Імпорти захисту
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN) // Доступ тільки для адмінів
@Controller('admin')
export class AdminController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  @Get('stats')
  @ApiOperation({ summary: 'Глобальна статистика системи (тільки для Admin)' })
  async getGlobalStats() {
    // Рахуємо кількість записів у фоні паралельно
    const [totalUsers, totalTrips] = await Promise.all([
      this.userRepository.count(),
      this.tripRepository.count(),
    ]);

    // Отримуємо всі витрати для підрахунку обороту
    const allExpenses = await this.expenseRepository.find();
    const totalMoney = allExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

    return {
      totalUsers,
      totalTrips,
      totalMoney: totalMoney.toFixed(2),
      systemStatus: 'Healthy',
      serverTime: new Date(),
    };
  }
}