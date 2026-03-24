import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty({ example: 'Відпустка в горах' })
  @IsString()
  @IsNotEmpty()
  title: string;

@ApiProperty({ example: '2026-03-24' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2026-03-30' })
  @IsDateString()
  endDate: string;
}