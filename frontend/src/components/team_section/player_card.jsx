import React from 'react'
import styled, { css } from 'styled-components'
import _ from 'lodash'

function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

export default function PlayerCard(props) {
  const { player, onClick } = props
  const avatar = _.get(player, 'info.avatar')
  const name = _.get(player, 'info.name')
  const games = _.get(player, 'games.length')

  return (
    <Container onClick={onClick}>
      <Card>
        <AvatarContainer>
          <Avatar src={avatar} grayscale={!games} />
        </AvatarContainer>
        <Text>
          {name}
          <br/>
          {games} {declOfNum(games, ['игра', 'игры', 'игр'])}
        </Text>
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
  
  ${props => props.grayscale && css`
    filter: grayscale(100%);
  `}
`

const AvatarContainer = styled.div`
  width: inherit;
  height: inherit;
  border-radius: 40px;
`

const Text = styled.div`
  margin-top: 5px;
  text-align: center;
  border-radius: 0px 0px 40px 40px;
  font-weight: bold;
  font-size: 16px;
`
