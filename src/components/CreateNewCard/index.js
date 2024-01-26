
import { useSetAtom } from 'jotai'
import { MdAdd } from 'react-icons/md';
import { titleAtom } from '../../services/jotai';
import {useBoards} from "../../services/zustand";

let modified = false
export function ButtonCreateNewCard({ boardIndex }) {
    const {addNewCardToBoard} = useBoards(({addNewCardToBoard}) => ({ addNewCardToBoard }))

    const setTitle = useSetAtom(titleAtom)

    function handleCreateNewCard() {
        setTitle('Modifiyed by ButtonCreateNewCard')
        modified = !modified
        const card = {
            id: Math.random(),
            content: '',
            editable: true,
            labels: ['#7159c1'],
            user: 'https://github.com/hallexcosta.png'
        }
        console.log({card})
        addNewCardToBoard(boardIndex, card)
    }

    return (
      <button onClick={handleCreateNewCard} type="button">
        <MdAdd size={24} color="#fff" />
      </button>
    )
}