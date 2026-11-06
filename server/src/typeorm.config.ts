import 'dotenv/config';
import { DataSource } from 'typeorm';
import { AmoTokenEntity } from './amo/database/amo-token.entity';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [AmoTokenEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
