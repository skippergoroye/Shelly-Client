import 'reflect-metadata';
import { DataSource } from 'typeorm';

const isDevelopment = process.env.NODE_ENV === 'development';

import { User } from './entities/User';

const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.DATABASE_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: isDevelopment, // Note: Set to false in production and use migrations
  logging: isDevelopment,
  entities: [User],
});

export const getDbConnection = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  }
  return AppDataSource;
};

export default AppDataSource;
