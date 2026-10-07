import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Meter } from './meters/meter.entity';
import { Reading } from './readings/reading.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Meter, Reading],
  migrations: ['src/migrations/*.ts'],
});