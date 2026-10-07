import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMeterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  serial: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  address: string;
}