import dotenv from 'dotenv'
import catbox from 'catbox-redis'

dotenv.config()

const redis = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  auth: process.env.REDIS_AUTH,
  prefix: 'testparty'
}

const steam = {
  key: process.env.STEAM_API_KEY
}

const server = {
  host: process.env.TESTPARTY_HOST || 'localhost',
  port: process.env.TESTPARTY_PORT || 4004,
  cache: [
    {
      name: 'cache',
      provider: {
        constructor: catbox,
        options: {
          partition: redis.prefix,
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
