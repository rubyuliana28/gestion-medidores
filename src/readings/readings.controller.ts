import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateReadingDto } from './create-reading.dto';
import { ReadingsService } from './readings.service';

@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Get('meter/:meterId')
  findByMeter(@Param('meterId', ParseIntPipe) meterId: number) {
    return this.readingsService.findByMeter(meterId);
  }

  @Post()
  create(@Body() dto: CreateReadingDto) {
    return this.readingsService.create(dto);
  }
}