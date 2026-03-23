import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createTripDto: CreateTripDto) {
    const newTrip = this.tripRepository.create(createTripDto);
    return await this.tripRepository.save(newTrip);
  }

  async findAll() {
    // relations: ['expenses'] каже TypeORM зробити JOIN таблиць автоматично!
    return await this.tripRepository.find({ 
      relations: ['expenses', 'activities'],
      order: { createdAt: 'DESC' } // Нові поїздки будуть зверху
    });
  }

  async findOne(id: string) {
    const trip = await this.tripRepository.findOne({ where: { id } });
    if (!trip) throw new NotFoundException('Подорож не знайдена');
    return trip;
  }
}