import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetersService } from '../meters/meters.service';
import { CreateReadingDto } from './create-reading.dto';
import { Reading } from './reading.entity';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(Reading)
    private readonly readingsRepo: Repository<Reading>,
    private readonly metersService: MetersService,
  ) {}

  async findByMeter(meterId: number): Promise<Reading[]> {
    await this.metersService.findOne(meterId);
    return this.readingsRepo.find({
      where: { meter: { id: meterId } },
      order: { date: 'ASC' },
    });
  }

  async create(dto: CreateReadingDto) {
    const meter = await this.metersService.findOne(dto.meterId);
    const saved = await this.readingsRepo.save(
      this.readingsRepo.create({ kwh: dto.kwh, date: dto.date, meter }),
    );
    return {
      id: saved.id,
      kwh: saved.kwh,
      date: saved.date,
      meterId: meter.id,
    };
  }
}