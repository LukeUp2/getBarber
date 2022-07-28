import React from 'react'
import styled from 'styled-components'

import StarFull from '../assets/star.svg'
import StarHalf from '../assets/star_half.svg'
import StarEmpty from '../assets/star_empty.svg'

const StarArea = styled.View`
  flex-direction: row;
`
const StarView = styled.View``

const StarText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  maring-left: 5px;
  color: #737373;
`

export default function Stars({ stars, showNumber }) {
  //0 -> Empty star
  //1 -> Half star
  //2 -> Full star
  let starsArray = [0, 0, 0, 0, 0];

  let floor = Math.floor(stars)
  let left = stars - floor;

  for(var i = 0; i < floor; i++){
    starsArray[i] = 2;
  }

  if(left > 0){
    starsArray[i] = 1
  }

  return (
    <StarArea>
      {starsArray.map((item, key) => (
        <StarView key={key}>
          {item === 0 && <StarEmpty width="18" height="18" fill="#ff9200" />}
          {item === 1 && <StarHalf width="18" height="18" fill="#ff9200" />}
          {item === 2 && <StarFull width="18" height="18" fill="#ff9200" />}
        </StarView>
      ))}

      {showNumber && <StarText>{stars}</StarText>}
    </StarArea>
  )
}
