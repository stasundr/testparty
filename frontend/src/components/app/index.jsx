import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import DescriptionSection from './description'
import NewPlayerForm from './new_player_form'
import TeamSection from '../team_section'
import GamesSection from '../games_section'

export default function App() {
  const [players, setPlayers] = useState([])

  return (
    <Container>
      <Style />
      <DescriptionSection />
      <NewPlayerForm players={players} setPlayers={setPlayers} />
      <TeamSection players={players} />
      <GamesSection players={players} />
    </Container>
  )
}

const Style = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans');
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Noto Sans', sans-serif;
  }
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
