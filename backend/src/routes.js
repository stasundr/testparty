import Joi from 'joi'
import _ from 'lodash'
import Steam from './steam'

export default function mountRoutes(server) {
  const steam = new Steam()

  server.method({
    name: 'getPlayerInfo',
    method: steam.getPlayerInfo.bind(steam),
    options: {
      cache: {
        cache: 'cache',
        expiresIn: 60 * 60 * 1000,
        generateTimeout: 6 * 1000
      }
    }
  })

  server.method({
    name: 'getGameInfo',
    method: steam.getGameInfo.bind(steam),
    options: {
      cache: {
        cache: 'cache',
        expiresIn: 30 * 24 * 60 * 60 * 1000,
        generateTimeout: 6 * 1000
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/profile',
    async handler(request) {
      try {
        const player = _.get(request, 'payload.player')
        const games = await steam.getPlayerGames(player)
        const info = await server.methods.getPlayerInfo(player)

        return { info, games }
      } catch (error) {}

      return {}
    },
    config: {
      description: 'Request player profile',
      validate: {
        payload: Joi.object({
          player: Joi.string()
            .max(128)
            .required()
        }).options({ stripUnknown: true })
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/game',
    async handler(request) {
      try {
        const appID = _.get(request, 'payload.id')
        return await server.methods.getGameInfo(appID)
      } catch (error) {}

      return {}
    },
    config: {
      description: 'Request game info',
      validate: {
        payload: Joi.object({
          id: Joi.number().required()
        }).options({ stripUnknown: true })
      }
    }
  })
}
