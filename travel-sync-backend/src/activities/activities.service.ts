import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  // Створення плану
  async create(createActivityDto: CreateActivityDto) {
    const activity = this.activityRepository.create(createActivityDto);
    return await this.activityRepository.save(activity);
  }

  // Оновлення статусу (V)
  async update(id: string, updateData: UpdateActivityDto) {
    await this.activityRepository.update(id, updateData);
    return this.activityRepository.findOneBy({ id });
  }

  // Видалення
  async remove(id: string) {
    return await this.activityRepository.delete(id);
  }
}