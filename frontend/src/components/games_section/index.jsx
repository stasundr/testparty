import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import bluebird from 'bluebird'
import { fetchGameInfo } from '../../api'

function rateCommonGames(players) {
  const appIDs = players.map(player =>
    _.chain(player)
      .get('games', [])
      .map('appid')
      .value()
  )
  const commonIDs = _.intersection(...appIDs)
  const games = commonIDs
    .map(id =>
      players
        .map(player =>
          _.chain(player)
            .get('games', [])
            .filter({ appid: id })
            .get(0)
            .value()
        )
        .reduce(
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

export default function GamesSection(props) {
  const { players } = props
  const [games, setGames] = useState([])

  useEffect(() => {
    const selectedGames = rateCommonGames(players)
      .map(game => game.appid)
      .slice(0, 5)

    bluebird
      .map(selectedGames, fetchGameInfo)
      .then(data => setGames(data.filter(datum => datum !== null)))
  }, [players])

  return (
    <Container>
      {games.map(game => (
        <GameCardContainer>
          <Image src={game.image} />
        </GameCardContainer>
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const GameCardContainer = styled.div`
  margin: 30px auto;
  width: 320px;
  height: 150px;
  border-radius: 20px;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`

const Image = styled.img`
  width: inherit;
  height: inherit;
  border-radius: 20px;
  object-fit: contain;
`
