import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReadingsService } from './readings.service';

@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Get('meter/:meterId')
  findByMeter(@Param('meterId', ParseIntPipe) meterId: number) {
    return this.readingsService.findByMeter(meterId);
  }
}