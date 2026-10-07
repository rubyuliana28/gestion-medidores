import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meter } from './meter.entity';

@Injectable()
export class MetersService {
  constructor(
    @InjectRepository(Meter)
    private readonly metersRepo: Repository<Meter>,
  ) {}

  findAll(): Promise<Meter[]> {
    return this.metersRepo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Meter> {
    const meter = await this.metersRepo.findOneBy({ id });
    if (!meter) {
      throw new NotFoundException(`El medidor ${id} no existe`);
    }
    return meter;
  }
}