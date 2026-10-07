import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetersService } from '../meters/meters.service';
import { Reading } from './reading.entity';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(Reading)
    private readonly readingsRepo: Repository<Reading>,
    private readonly metersService: MetersService,
  ) {}

  async findByMeter(meterId: number): Promise<Reading[]> {
    await this.metersService.findOne(meterId); // lanza 404 si no existe
    return this.readingsRepo.find({
      where: { meter: { id: meterId } },
      order: { date: 'ASC' },
    });
  }
}