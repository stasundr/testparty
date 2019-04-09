import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import DescriptionSection from './description'
import NewPlayerForm from './new_player_form'
import { fetchProfile } from '../../api'

export default function App() {
  const [players, setPlayers] = useState([])

  return (
    <Container>
      <Style />
      <DescriptionSection />
      <NewPlayerForm onSubmit={() => {}} />
      <h1>TeamSection</h1>
      <h1>GamesSection</h1>
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
