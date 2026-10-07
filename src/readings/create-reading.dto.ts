import { IsDateString, IsInt, IsNumber, Min } from 'class-validator';

export class CreateReadingDto {
  @IsInt()
  @Min(1)
  meterId: number;

  @IsNumber()
  @Min(0)
  kwh: number;

  @IsDateString()
  date: string;
}