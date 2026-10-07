import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MetersService } from './meters.service';

@Controller('meters')
export class MetersController {
  constructor(private readonly metersService: MetersService) {}

  @Get()
  findAll() {
    return this.metersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.metersService.findOne(id);
  }
}