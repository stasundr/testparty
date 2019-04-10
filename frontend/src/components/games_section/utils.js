import _ from 'lodash'

export function findGameByID(id, data) {
  return data.map(datum =>
    _.chain(datum)
      .get('games', [])
      .filter({ appid: id })
      .get(0)
      .value()
  )
}

export function rateCommonGames(players) {
  if (!_.isArray(players)) return []
  if (players.length === 1)
    return _.chain(players)
      .get('0.games', [])
      .sortBy('playtime_forever')
      .reverse()
      .value()

  const appIDs = players.map(player =>
    _.chain(player)
      .get('games', [])
      .map('appid')
      .value()
  )
  const commonIDs = _.intersection(...appIDs)
  const games = commonIDs
    .map(id =>
      findGameByID(id, players).reduce(
        (result, current) => ({
          appid: current.appid,
          top: result.top * (_.get(current, 'playtime_forever', 0) + 1),
          bottom: result.bottom + _.get(current, 'playtime_forever', 0)
        }),
        { top: 1, bottom: 1 }
      )
    )
    .map(({ appid, top, bottom }) => ({ appid, score: top / bottom }))

  return _.chain(games)
    .sortBy('score')
    .reverse()
    .value()
}
