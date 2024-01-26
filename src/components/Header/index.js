import { useAtomValue } from 'jotai'
import { Container } from './styles'
import { titleAtom } from '../../services/jotai'
import {useState} from 'react'

export default function Header() {
  const title = useAtomValue(titleAtom)
  const [titleState, setTitleState]  =useState('Pipefy')
  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
      <h1>State: {titleState}</h1>
      <h1>Atom: {title}</h1>
      </div>
      <button onClick={() => setTitleState('Modified in Header')}>Click me</button>
    </Container>
  )
}

