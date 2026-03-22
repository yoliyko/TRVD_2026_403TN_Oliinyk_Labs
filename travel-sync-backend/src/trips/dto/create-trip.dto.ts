import { IsString, IsNotEmpty, MinLength, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty({ example: 'Подорож до Риму' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'EUR' })
  @IsString()
  @Length(3, 3) // Валюта має бути рівно 3 літери
  baseCurrency: string;
}