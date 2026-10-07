import { Injectable, NotFoundException } from '@nestjs/common';

export interface Meter {
  id: number;
  serial: string;
  address: string;
}

@Injectable()
export class MetersService {
  private meters: Meter[] = [
    { id: 1, serial: 'MED-001', address: 'Calle 10 # 5-20' },
    { id: 2, serial: 'MED-002', address: 'Carrera 7 # 12-45' },
  ];

  findAll(): Meter[] {
    return this.meters;
  }

  findOne(id: number): Meter {
    const meter = this.meters.find((m) => m.id === id);
    if (!meter) {
      throw new NotFoundException(`El medidor ${id} no existe`);
    }
    return meter;
  }
}