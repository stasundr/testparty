import axios from 'axios'
import _ from 'lodash'
import { server } from './config'

export async function fetchProfile(playerID) {
  try {
    const response = await axios.post(`${server.host}/profile`, { player: playerID })
    return _.get(response, 'data')
  } catch (error) {}

  return null
}

export async function fetchGameInfo(appID) {
  try {
    const response = await axios.post(`${server.host}/game`, { id: appID })
    return _.get(response, 'data')
  } catch (error) {}

  return null
}
