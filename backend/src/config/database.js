import 'dotenv/config';

const config = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'hr_platform_new',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  // test: {
  //   username: process.env.DB_USER || 'postgres',
  //   password: process.env.DB_PASSWORD || 'postgres',
  //   database: process.env.DB_NAME || 'hr_platform_test',
  //   host: process.env.DB_HOST || 'localhost',
  //   port: parseInt(process.env.DB_PORT || '5432', 10),
  //   dialect: 'postgres',
  //   logging: false,
  // },
  // production: {
  //   username: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOST,
  //   port: parseInt(process.env.DB_PORT || '5432', 10),
  //   dialect: 'postgres',
  //   logging: false,
  //   pool: {
  //     max: 10,
  //     min: 0,
  //     acquire: 30000,
  //     idle: 10000,
  //   },
  //   dialectOptions: {
  //     ssl: {
  //       require: true,
  //       rejectUnauthorized: false,
  //     },
  //   },
  // },
};

// Export the configuration
export default config;
