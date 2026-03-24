import { IsString, IsNotEmpty, IsUUID, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiProperty({ example: 'Купити квитки в музей', description: 'Назва плану/завдання' })
  @IsString({ message: 'Назва має бути рядком' })
  @IsNotEmpty({ message: 'Назва не може бути порожньою' })
  @MinLength(3, { message: 'Назва занадто коротка (мінімум 3 символи)' })
  @MaxLength(100, { message: 'Назва занадто довга (максимум 100 символів)' })
  name: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID поїздки' })
  @IsUUID('all', { message: 'tripId має бути валідним UUID' })
  @IsNotEmpty({ message: 'ID поїздки є обов’язковим' })
  tripId: string;
}