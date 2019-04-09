import axios from 'axios'
import _ from 'lodash'
import { parse } from 'url'
import { isWebUri } from 'valid-url'
import config from './config'
import SteamSpy from './steamspy'

const { key } = config.steam

export default class Steam {
  constructor() {
    this.steamspy = new SteamSpy()
  }

  async getSteamID(id) {
    if (!_.isString(id)) return null

    // id - один из 5 вариантов:
    //   1. steamcommunity.com/id/vanity_id
    //   2. steamcommunity.com/profiles/steam_id
    //   3. vanity_id
    //   4. steam_id
    //   5. unknown/other

    // 1 & 2
    if (!isWebUri(id)) {
      const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${key}&vanityurl=${id}`
      const response = await axios.get(url)

      return _.get(response, 'data.response.steamid', id)
      // 3 & 4
    } else if (parse(id).hostname.match('steamcommunity.com')) {
      const pathname = parse(id).pathname
      const pid = pathname.split('/')[2]

      if (pathname.match('/id/')) {
        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${key}&vanityurl=${pid}`
        const response = await axios.get(url)

        return _.get(response, 'data.response.steamid', pid)
      }

      if (pathname.match('/profiles/')) {
        return pid
      }
    }

    // 5
    return id
  }

  async getPlayerInfo(id) {
    try {
      const steamID = await this.getSteamID(id)
      if (!steamID) return {}

      const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamID}`
      const response = await axios.get(url)

      info.avatar = get(response, 'data.response.players.0.avatarfull')
      info.name = get(response, 'data.response.players.0.personaname')
      info.id = steamID
    } catch (error) {}

    return {}
  }

  async getPlayerGames(id) {
    try {
      const steamID = await this.getSteamID(id)
      const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamID}&format=json`
      const response = await axios.get(url)
      const games = get(response, 'data.response.games', [])
      const appIDs = games.map(({ appid }) => appid)
      const multiplayerIDs = await this.steamspy.filterMultiplayerApps(appIDs)
      const multiplayerGames = games.filter(
        ({ appid }) => multiplayerIDs.indexOf(appid) >= 0
      )

      return multiplayerGames
    } catch (error) {}

    return []
  }

  async getGameInfo(appID) {
    const info = { success: false }

    if (!_.isFinite(appID)) return info

    try {
      const url = `http://store.steampowered.com/api/appdetails/?appids=${appID}`
      const response = await axios.get(url)

      info.success = get(response, `data.${appID}.success`, false)
      info.name = get(response, `data.${appID}.data.name`)
      info.image = get(response, `data.${appID}.data.header_image`)
    } catch (error) {}

    return info
  }
}
