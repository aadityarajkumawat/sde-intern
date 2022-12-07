import { useState } from 'react'
import { tasty } from 'tastycss'
import { SearchBar } from './components/searchbar'

const Flex = tasty({
  as: 'div',
  styles: {
    display: 'flex',
  },
  styleProps: ['textAlign', 'flexDirection'],
})

const Heading = tasty({
  as: 'h1',
  styles: {
    width: '100%',
    fontSize: '50px',
    fontFamily: 'Montserrat',
  },
  styleProps: ['fontWeight', 'padding'],
})

const initialState = { search: '' }
type LocalAppState = typeof initialState

function App() {
  const [localApp, setLocalApp] = useState<LocalAppState>({ ...initialState })

  return (
    <div>
      <Flex textAlign='center' flexDirection='column'>
        <Heading fontWeight='300' padding='2rem 0 0 0'>
          Galleria
        </Heading>
        <p>Find the perfect image</p>

        <SearchBar
          value={localApp.search}
          onChange={(text) => setLocalApp((ls) => ({ ...ls, search: text }))}
        />
      </Flex>
    </div>
  )
}

export default App
