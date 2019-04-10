import React from 'react'
import styled from 'styled-components'
import PlayerCard from './player_card'

export default function TeamSection(props) {
  const { players } = props
  const cards = players.map(({ info, games }) => (
    <PlayerCard key={info.id} avatar={info.avatar} name={info.name} empty={!games.length}/>
  ))

  return <Container>{cards}</Container>
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
