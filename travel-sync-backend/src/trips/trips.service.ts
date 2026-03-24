import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  // 1. Створення подорожі (тепер з startDate та endDate)
  async create(createTripDto: CreateTripDto, userId: string) {
    const newTrip = this.tripRepository.create({
      ...createTripDto,
      userId, // Прив'язуємо до поточного юзера
    });
    return await this.tripRepository.save(newTrip);
  }

  // 2. Отримання всіх подорожей юзера (сортуємо за датою початку)
  async findAll(userId: string) {
    return await this.tripRepository.find({
      where: { userId },
      relations: ['expenses', 'activities'],
      order: { startDate: 'ASC' }, // Нова логіка сортування
    });
  }

  // 3. Пошук за публічним ID (для шерингу)
  async findByShareId(shareId: string) {
    const trip = await this.tripRepository.findOne({
      where: { shareId },
      relations: ['expenses', 'activities'],
    });
    if (!trip) throw new NotFoundException('Подорож не знайдена');
    return trip;
  }

  // 4. Видалення (з перевіркою прав)
  async remove(id: string, user: any) {
    const trip = await this.tripRepository.findOne({ where: { id } });
    
    if (!trip) throw new NotFoundException('Подорож не знайдена');

    // Тільки власник або адмін може видалити
    if (trip.userId !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('У вас немає прав для видалення цієї подорожі');
    }

    await this.tripRepository.delete(id);
    return { message: 'Подорож успішно видалена' };
  }
}