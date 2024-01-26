import {create} from "zustand";
import {loadBordsWithCards} from "./api";

export const useBoards = create((set) => {
    const move = (fromList, toList, from, to = null) => {
        return set((state) => {
            const movedBoards = [...state.boards]
            const draggedCard = movedBoards[fromList].cards[from]

            movedBoards[fromList].cards.splice(from, 1)
            movedBoards[toList].cards.splice(to, 0, draggedCard)
            return {
                boards: movedBoards
            }
        })
    }
    const update = (boardIndex, cardIndex, content, editable) => {
        return set(state => {
            const editableBoards = [...state.boards]
            editableBoards[boardIndex].cards[cardIndex].content = content
            editableBoards[boardIndex].cards[cardIndex].editable = editable
            return {
                boards: editableBoards
            }
        })
    }
    const addNewCardToBoard = (boardIndex, card) => {
        return set(state => {
            const newBoards = [...state.boards]
            newBoards[boardIndex].cards.push(card)
            return {
                boards: newBoards
            }
        })
    }
    return {
        boards: loadBordsWithCards(),
        move,
        addNewCardToBoard,
        update
    }
})