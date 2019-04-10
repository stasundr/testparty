import React from 'react'
import styled from 'styled-components'
import PlayerCard from './player_card'

export default function TeamSection(props) {
  const { players, setPlayers } = props
  const removePlayer = index => setPlayers(players.filter((p, i) => i !== index))
  const cards = players.map((player, index) => (
    <PlayerCard key={player.info.id} player={player} onClick={() => removePlayer(index)}/>
  ))

  return <Container>{cards}</Container>
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
