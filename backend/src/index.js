import Hapi from 'hapi'
import config from './config'
import mountRoutes from './routes'

async function start() {
  const server = Hapi.Server(config.server)

  mountRoutes(server)

  try {
    await server.start()
  } catch (error) {}
}

start()
