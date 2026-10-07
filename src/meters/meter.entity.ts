import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reading } from '../readings/reading.entity';

@Entity('meters')
export class Meter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  serial: string;

  @Column()
  address: string;

  @OneToMany(() => Reading, (reading) => reading.meter)
  readings: Reading[];
}