import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from '../common/pagination-query.dto';
import { CreateMeterDto } from './create-meter.dto';
import { MetersService } from './meters.service';

@Controller('meters')
export class MetersController {
  constructor(private readonly metersService: MetersService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.metersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.metersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMeterDto) {
    return this.metersService.create(dto);
  }
}