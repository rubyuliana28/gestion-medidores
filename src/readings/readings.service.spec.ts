import { beforeEach, describe, expect, it } from '@jest/globals';
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MetersService } from '../meters/meters.service';
import { Reading } from './reading.entity';
import { ReadingsService } from './readings.service';

describe('ReadingsService', () => {
  let service: ReadingsService;

  const repoFalso = {
    find: async () => [{ id: 1, kwh: 120.5, date: '2026-10-01' }],
    create: (dto: unknown) => dto,
    save: async (r: Record<string, unknown>) => ({ id: 10, ...r }),
  };

  // MetersService falso: solo el medidor 1 existe
  const metersFalso = {
    findOne: async (id: number) => {
      if (id !== 1) throw new NotFoundException(`El medidor ${id} no existe`);
      return { id: 1, serial: 'MED-001', address: 'Calle 10' };
    },
  };

  beforeEach(async () => {
    const modulo = await Test.createTestingModule({
      providers: [
        ReadingsService,
        { provide: getRepositoryToken(Reading), useValue: repoFalso },
        { provide: MetersService, useValue: metersFalso },
      ],
    }).compile();

    service = modulo.get(ReadingsService);
  });

  it('findByMeter devuelve las lecturas del medidor', async () => {
    const lecturas = await service.findByMeter(1);
    expect(lecturas).toHaveLength(1);
  });

  it('findByMeter lanza NotFoundException si el medidor no existe', async () => {
    await expect(service.findByMeter(99)).rejects.toThrow(NotFoundException);
  });

  it('create guarda la lectura asociada al medidor', async () => {
    const lectura = await service.create({
      meterId: 1,
      kwh: 140.3,
      date: '2026-10-07',
    });
    expect(lectura).toEqual({
      id: 10,
      kwh: 140.3,
      date: '2026-10-07',
      meterId: 1,
    });
  });

  it('create lanza NotFoundException si el medidor no existe', async () => {
    await expect(
      service.create({ meterId: 99, kwh: 10, date: '2026-10-07' }),
    ).rejects.toThrow(NotFoundException);
  });
});