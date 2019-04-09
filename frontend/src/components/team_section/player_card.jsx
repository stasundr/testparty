import React from 'react'
import styled from 'styled-components'

export default function PlayerCard(props) {
  const { avatar, name } = props

  return (
    <Container>
      <Card>
        <AvatarContainer>
          <Avatar src={avatar} />
        </AvatarContainer>
        <Title>
          <p>{name}</p>
        </Title>
      </Card>
    </Container>
  )
}

const Container = styled.div`
  padding: 15px;
`

const Card = styled.div`
  margin: 30px auto;
  width: 150px;
  height: 150px;
  border-radius: 20px;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: 0.3s;

  :hover {
    transform: scale(0.95, 0.95);
    box-shadow: 0px 0px 20px 8px rgba(0, 0, 0, 0.25);
  }
`

const Avatar = styled.img`
  width: inherit;
  height: inherit;
  border-radius: 20px;
  object-fit: cover;
`

const AvatarContainer = styled.div`
  width: inherit;
  height: inherit;
  border-radius: 40px;
`

const Title = styled.div`
  text-align: center;
  color: white;
  border-radius: 0px 0px 40px 40px;
  font-weight: bold;
  font-size: 20px;
  margin-top: -60px;
  height: 20px;
`
