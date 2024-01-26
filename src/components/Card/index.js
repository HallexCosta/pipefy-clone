import { useRef, useContext, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import {Container, Input, Label} from './styles'
import {useBoards} from "../../services/zustand";
import {useAtom} from "jotai";
import {movedAtom} from "../../services/jotai";


export default function Card({ data, cardIndex, boardIndex }) {
  const [editableContent, setEditableContent] = useState(null)
  const cardRef = useRef()
  const {boards, move, update} = useBoards(({boards, move, update}) => ({ boards, move, update }))

  const [collect, dragRef] = useDrag({
    type: 'CARD',
    item: {  cardIndex, boardIndex, lastCardIndexPosition: boards[boardIndex].cards.length - 1 },
    collect: monitor => {
      return {
        isDragging: monitor.isDragging(),
        cardIndex,
        boardIndex
      }
    },
  })

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover: (item, monitor) => {
      // console.log(dragPreview)
      if (!cardRef.current) return

      const draggedBoardIndex = item.boardIndex
      const targetBoardIndex = boardIndex

      const draggedCardIndex = item.cardIndex
      const targetCardIndex = cardIndex

      if (draggedCardIndex === targetCardIndex && draggedBoardIndex === targetBoardIndex) {
        return
      }

      // console.log(cardRef.current.innerText)
      const targetSize = cardRef.current.getBoundingClientRect()
      const targetCenter = (targetSize.bottom - targetSize.top) / 2
      // console.log({targetCenter})
      // console.log({isDragging: collect.isDragging})
      // console.log({draggedBoardIndex, targetBoardIndex, draggedCardIndex, targetCardIndex})

      console.log(monitor.isOver())
      const draggedOffset = monitor.getClientOffset()
      const draggedTop = draggedOffset.y - targetSize.top

      // console.log(draggedTop, targetCenter)
      const preventMovedCardToBeforePositionIt = draggedCardIndex < targetCardIndex && draggedTop < targetCenter
      if (preventMovedCardToBeforePositionIt) return
      const preventMovedCardToAfterPositionIt = draggedCardIndex > targetCardIndex && draggedTop > targetCenter
      if (preventMovedCardToAfterPositionIt) return


      // if (collect.isDragging)
      move(draggedBoardIndex, targetBoardIndex, draggedCardIndex, targetCardIndex)
      item.cardIndex = targetCardIndex
      item.boardIndex = targetBoardIndex
      console.log({targetCardIndex, targetBoardIndex})
    },
  })

  const onHandleEditContent = (event) => {
    const keyHandlers = {
      enter: () => update(boardIndex, cardIndex, editableContent, false)
    }
    const command = keyHandlers[event.key.toLowerCase()]
    if (!command) return
    command()
  }

  const onHandleDoubleClick = (event) => {
    const editableBoards = [...boards]
    const sameContent = editableBoards[boardIndex].cards[cardIndex].content
    update(boardIndex, cardIndex, sameContent, true)
  }

  dragRef(dropRef(cardRef))

  const isDraggingFn = () => {
    console.log({cardIndex, boardIndex, isDragging: collect.isDragging, itemIsDragging: collect.item?.isDragging, content: data.content, collect})
    return collect.isDragging
  }
  return (
    <Container onDoubleClick={onHandleDoubleClick} ref={cardRef}>
      <header>
        {/*{data.labels && data.labels.map(label => {*/}
        {/*  return <Label key={label} color={label} />*/}
        {/*})}*/}
      </header>
      {data.editable 
      ? <Input
          onChange={event => setEditableContent(event.target.value)}
          onKeyDown={onHandleEditContent} 
          key={data.content} 
          value={editableContent === null ? data.content : editableContent} 
          autoFocus={true}
        /> 
      : <p>{data.content}</p>}
      {data.user && <img src={data.user} alt={data.user} />}
    </Container>
  )
}
