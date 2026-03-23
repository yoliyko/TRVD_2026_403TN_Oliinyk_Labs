import { IsString, IsNumber, IsUUID, IsNotEmpty, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  title: string; // Назва витрати (наприклад "Квитки на поїзд")

  @IsNumber()
  @Min(0.01)
  amount: number; // Сума (наприклад 1500.50)

  @IsUUID()
  tripId: string; // До якої поїздки це належить
}