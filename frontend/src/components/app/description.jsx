import React from 'react'
import styled from 'styled-components'

export default function DescriptionSection() {
  return (
    <Container>
      <h1>Не знаешь во что с друзьями поиграть в Steam?</h1>
      <h2>Собери команду и я подскажу тебе!</h2>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
