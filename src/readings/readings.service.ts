import { Injectable } from '@nestjs/common';
import { MetersService } from '../meters/meters.service';

@Injectable()
export class ReadingsService {
  private readings = [
    { id: 1, meterId: 1, kwh: 120.5, date: '2026-10-01' },
    { id: 2, meterId: 1, kwh: 131.2, date: '2026-10-05' },
    { id: 3, meterId: 2, kwh: 98.0, date: '2026-10-02' },
  ];

  constructor(private readonly metersService: MetersService) {}

  findByMeter(meterId: number) {
    this.metersService.findOne(meterId);
    return this.readings.filter((r) => r.meterId === meterId);
  }
}