import { Container } from './styles'

import Card from '../Card'

import { ButtonCreateNewCard } from '../CreateNewCard';
import { useRef} from 'react';
import {useDrag, useDrop} from "react-dnd";
import {useBoards} from "../../services/zustand";

export default function Board({ data, boardIndex }) {
    const {boards, move} = useBoards(({boards, move}) => ({boards, move}))
    const boardRef = useRef()

    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover: (item, monitor) => {
            const toBoardIndex = boardIndex
            const fromBoardIndex = item.boardIndex
            const draggedFromCardIndex = item.cardIndex

            if (fromBoardIndex === toBoardIndex) return
            if (boards[toBoardIndex].cards.length > 0) return

            move(fromBoardIndex, toBoardIndex, draggedFromCardIndex, 0)

            item.cardIndex = 0
            item.boardIndex = toBoardIndex
        },
    })
    dropRef(boardRef)

  return (
    <Container done={data.done} ref={boardRef}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && <ButtonCreateNewCard boardIndex={boardIndex} />}
      </header>

      <ul>
        {data.cards.map((card, index) => <Card key={index} boardIndex={boardIndex} cardIndex={index} data={card} />)}
      </ul>
    </Container>
  )
}
