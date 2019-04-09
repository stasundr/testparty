import dotenv from 'dotenv'
import catbox from 'catbox-redis'

dotenv.config()

const redis = {
  host: 'localhost' || process.env.REDIS_HOST,
  port: 6379 || process.env.REDIS_PORT,
  auth: process.env.REDIS_AUTH
}

const steam = {
  key: process.env.STEAM_API_KEY
}

const server = {
  host: 'localhost' || process.env.TESTPARTY_HOST,
  port: 4004 || process.env.TESTPARTY_PORT,
  cache: [
    {
      name: 'cache',
      provider: {
        constructor: catbox,
        options: {
          partition: 'testparty',
          ...redis
        }
      }
    }
  ]
}

export default {
  steam,
  server,
  redis
}
