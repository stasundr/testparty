import React, { useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { fetchProfile } from '../../api'

export default function NewPlayerForm(props) {
  const { players, setPlayers } = props
  const [text, setText] = useState('')
  const updateText = e => setText(e.target.value)

  const handleClick = async () => {
    try {
      const profile = await fetchProfile(text)
      if (profile) {
        const updatedPlayers = _.uniqBy([...players, profile], 'info.id')
        setPlayers(updatedPlayers)
        setText('')
      }
    } catch (error) {}
  }

  const handleKeyPress = async (e) => {
    if (e.charCode === 13) {
      await handleClick()
    }
  }

  return (
    <Container>
      <Form>
        <Input
          value={text}
          placeholder="Имя профиля или ссылка на профиль в Steam"
          autoFocus
          onChange={updateText}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleClick}>Добавить</Button>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Form = styled.div`
  display:flex;
  flex-direction: row;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.15);
`

const Input = styled.input`
  width: 450px;
  font: inherit;
  font-size: 14px;
  border: none;
  outline: none;
  padding: 15px;
`

const Button = styled.button``
