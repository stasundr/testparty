import Hapi from 'hapi'
import config from './config'

async function start() {
  const server = Hapi.Server(config.server)

  try {
    await server.start()
  } catch (error) {}
}

start()
