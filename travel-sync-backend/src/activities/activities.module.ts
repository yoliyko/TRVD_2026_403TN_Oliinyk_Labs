import { Controller, Post, Body, Patch, Param, Delete, UseGuards, Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Activity } from './entities/activity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@ApiTags('activities')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  // Прибрали +id, бо у нас UUID (string)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: { isCompleted: boolean }) {
    return this.activitiesService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(id);
  }
}
@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]), // <--- ПЕРЕВІР ЦЕЙ РЯДОК
    AuthModule,
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
})
export class ActivitiesModule {}