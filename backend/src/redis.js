import redis from 'redis'
import bluebird from 'bluebird'
import config from './config'

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const { port, host, auth } = config.redis
const client = redis.createClient(port, host)

if (auth) client.auth(auth)

client.on('error', err => {
  throw err
})

export default client
