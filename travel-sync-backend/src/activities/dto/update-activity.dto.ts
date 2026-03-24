import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateActivityDto {
  @ApiProperty({ example: true, description: 'Статус виконання завдання' })
  @IsBoolean({ message: 'isCompleted має бути логічним значенням (true/false)' })
  @IsOptional()
  isCompleted?: boolean;
}