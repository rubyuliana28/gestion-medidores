import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetersModule } from '../meters/meters.module';
import { ReadingsController } from './readings.controller';
import { ReadingsService } from './readings.service';
import { Reading } from './reading.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reading]), MetersModule],
  controllers: [ReadingsController],
  providers: [ReadingsService],
})
export class ReadingsModule {}