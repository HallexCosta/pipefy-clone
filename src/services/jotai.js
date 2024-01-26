import {atom} from 'jotai'
import { loadBordsWithCards } from "./api";

export const boardsAtom = atom(loadBordsWithCards())

export const titleAtom = atom('Pipefy')

export const movedAtom = atom(null)