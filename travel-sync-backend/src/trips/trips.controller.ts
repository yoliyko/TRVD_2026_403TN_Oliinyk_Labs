import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  // 1. ПУБЛІЧНИЙ МЕТОД (Шеринг - доступний всім)
  @Get('share/:shareId')
  @ApiOperation({ summary: 'Публічний доступ до поїздки' })
  findByShareId(@Param('shareId') shareId: string) {
    return this.tripsService.findByShareId(shareId);
  }

  // 2. ЗАХИЩЕНІ МЕТОДИ (тільки для залогінених користувачів)
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createTripDto: CreateTripDto, @Req() req: any) {
    // req.user заповнюється автоматично завдяки JwtStrategy
    return this.tripsService.create(createTripDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Req() req: any) {
    return this.tripsService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.tripsService.remove(id, req.user);
  }
}