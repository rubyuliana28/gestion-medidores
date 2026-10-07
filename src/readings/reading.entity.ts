import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Meter } from '../meters/meter.entity';

@Entity('readings')
export class Reading {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  kwh: number;

  @Column({ type: 'date' })
  date: string;

  @ManyToOne(() => Meter, (meter) => meter.readings, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'meter_id' })
  meter: Meter;
}