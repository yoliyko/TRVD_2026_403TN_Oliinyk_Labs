import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { Delete } from '@nestjs/common';



@ApiTags('trips') // Групування в Swagger
@Controller('trips')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth() 
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  @ApiOperation({ summary: 'Створити нову подорож' })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN) // <--- Тільки адмін!
  remove(@Param('id') id: string) {
    return { message: 'Поїздку видалено адміном' }; // Спростимо для тесту
  }

  @Get()
  @ApiOperation({ summary: 'Отримати всі подорожі' })
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати подорож за ID' })
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(id);
  }
  
}