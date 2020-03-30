module.exports = {
  port: process.env.PORT || 1984,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: 'kinkao_api',
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
};
