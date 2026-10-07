import { Module } from '@nestjs/common';
import { MetersModule } from '../meters/meters.module';
import { ReadingsController } from './readings.controller';
import { ReadingsService } from './readings.service';

@Module({
  imports: [MetersModule],
  controllers: [ReadingsController],
  providers: [ReadingsService],
})
export class ReadingsModule {}