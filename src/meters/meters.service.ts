import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/pagination-query.dto';
import { CreateMeterDto } from './create-meter.dto';
import { Meter } from './meter.entity';

@Injectable()
export class MetersService {
  constructor(
    @InjectRepository(Meter)
    private readonly metersRepo: Repository<Meter>,
  ) {}

  async findAll({ page, limit }: PaginationQueryDto) {
    const [data, total] = await this.metersRepo.findAndCount({
      order: { id: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number): Promise<Meter> {
    const meter = await this.metersRepo.findOneBy({ id });
    if (!meter) {
      throw new NotFoundException(`El medidor ${id} no existe`);
    }
    return meter;
  }

  async create(dto: CreateMeterDto): Promise<Meter> {
    const exists = await this.metersRepo.findOneBy({ serial: dto.serial });
    if (exists) {
      throw new ConflictException(
        `Ya existe un medidor con el serial ${dto.serial}`,
      );
    }
    return this.metersRepo.save(this.metersRepo.create(dto));
  }
}