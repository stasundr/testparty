import axios from 'axios'
import _ from 'lodash'

export async function fetchProfile(playerID) {
  try {
    const response = await axios.post('/profile', { player: playerID })
    return _.get(response, 'data')
  } catch (error) {}

  return null
}

export async function fetchGameInfo(appID) {
  try {
    const response = await axios.post('/game', { id: appID })
    return _.get(response, 'data')
  } catch (error) {}

  return null
}
