import { describe, expect, it } from '@jest/globals';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Meter } from './meter.entity';
import { MetersService } from './meters.service';

// Repositorio falso en memoria: así probamos la lógica sin base de datos.
function crearRepoFalso(inicial: Meter[]) {
  const medidores = [...inicial];
  return {
    findOneBy: async (where: Partial<Meter>) =>
      medidores.find((m) =>
        Object.entries(where).every(
          ([k, v]) => (m as unknown as Record<string, unknown>)[k] === v,
        ),
      ) ?? null,
    create: (dto: Partial<Meter>) => ({ ...dto }) as Meter,
    save: async (m: Meter) => {
      const guardado = { ...m, id: medidores.length + 1 } as Meter;
      medidores.push(guardado);
      return guardado;
    },
  } as unknown as Repository<Meter>;
}

const medidor1 = { id: 1, serial: 'MED-001', address: 'Calle 10' } as Meter;

describe('MetersService', () => {
  it('findOne devuelve el medidor si existe', async () => {
    const service = new MetersService(crearRepoFalso([medidor1]));
    await expect(service.findOne(1)).resolves.toEqual(medidor1);
  });

  it('findOne lanza NotFoundException si no existe', async () => {
    const service = new MetersService(crearRepoFalso([medidor1]));
    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
  });

  it('create lanza ConflictException si el serial ya existe', async () => {
    const service = new MetersService(crearRepoFalso([medidor1]));
    await expect(
      service.create({ serial: 'MED-001', address: 'Otra calle' }),
    ).rejects.toThrow(ConflictException);
  });

  it('create guarda un medidor nuevo', async () => {
    const service = new MetersService(crearRepoFalso([medidor1]));
    const nuevo = await service.create({ serial: 'MED-002', address: 'Calle 5' });
    expect(nuevo.serial).toBe('MED-002');
    expect(nuevo.id).toBe(2);
  });
});