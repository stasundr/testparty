import { RateLimiter } from 'limiter'
import axios from 'axios'
import bluebird from 'bluebird'
import _ from 'lodash'
import redis from './redis'
import config from './config'

const STEAMSPY_POLL_RATE = 4
const REDIS_QUEUE = `${config.redis.prefix}:steamspy:queue`
const REDIS_APP_DETAILS = `${config.redis.prefix}:steamspy:appdetails`

export default class SteamSpy {
  constructor() {
    this.isMultiplayerApp = this.isMultiplayerApp.bind(this)
    this.limiter = new RateLimiter(STEAMSPY_POLL_RATE, 'sec')
    setInterval(this.runQueue.bind(this), 1000 / STEAMSPY_POLL_RATE)
  }

  async isMultiplayerApp(appID) {
    if (!_.isFinite(appID)) return null

    try {
      const redisKey = `${REDIS_APP_DETAILS}:${appID}`
      const multiplayerState = await redis.getAsync(redisKey)
      const isMultiplayer = multiplayerState === 'true'

      if (!multiplayerState) await redis.rpushAsync(REDIS_QUEUE, appID)

      return isMultiplayer
    } catch (error) {}

    return false
  }

  async filterMultiplayerApps(appIDs) {
    if (!_.isArray(appIDs)) return []

    try {
      return await bluebird.filter(appIDs, this.isMultiplayerApp)
    } catch (error) {}

    return []
  }

  async runQueue() {
    try {
      const size = await redis.llenAsync(REDIS_QUEUE)

      if (size) {
        const appID = await redis.lpopAsync(REDIS_QUEUE)
        const redisKey = `${REDIS_APP_DETAILS}:${appID}`
        const isReady = this.limiter.tryRemoveTokens(1)

        if (isReady) {
          const url = `https://steamspy.com/api.php?request=appdetails&appid=${appID}`
          const response = await axios.get(url)
          const isMultiplayer = !!_.get(response, 'data.tags.Multiplayer')

          await redis.setAsync(redisKey, isMultiplayer)
        }
      }
    } catch (error) {}
  }
}
