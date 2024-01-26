import { DndProvider } from 'react-dnd'
import {HTML5Backend } from 'react-dnd-html5-backend'

import GlobalStyle from './styles/global'

import Header from './components/Header'
import Project from "./components/Project";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Project  />

      <GlobalStyle />
    </DndProvider>
  );
}

export default App;
