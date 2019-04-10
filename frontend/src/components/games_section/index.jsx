import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import bluebird from 'bluebird'
import { rateCommonGames } from './utils'
import { fetchGameInfo } from '../../api'

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
        <GameCardContainer key={game.name}>
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
