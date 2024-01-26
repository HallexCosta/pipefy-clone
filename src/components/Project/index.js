import { useEffect, useState } from 'react'
import produce from 'immer'

import { Container } from './styles'

import BoardContext from './context'

import Board from '../Board'
import { useAtom } from 'jotai'
import { boardsAtom } from '../../services/jotai'
import { useBoards } from "../../services/zustand";
import {useDrag} from "react-dnd";

export default function Project() {
  // const [lists, setLists] = useAtom(boardsAtom)
  const boards = useBoards(state => state.boards)


  return (
    // <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {boards.map((board, index) => <Board key={board.title} boardIndex={index} data={board} />)}
      </Container>
    // </BoardContext.Provider>
  )
}
