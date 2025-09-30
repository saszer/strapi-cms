export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: env('DATABASE_URL', ''),
    pool: { min: 2, max: 10 },
    acquireTimeoutMillis: 60000,
    ssl: env.bool('DATABASE_SSL', true) ? { rejectUnauthorized: false } : false,
  },
});


