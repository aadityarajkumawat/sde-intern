import { tasty } from 'tastycss'
import { InputField } from '../input'

const SearchBarContainer = tasty({
  as: 'div',
  styles: {
    margin: '1.5rem 0 1.5rem 0',
  },
})

interface SearchBarProps {
  value: string
  onChange: (text: string) => void
}

export function SearchBar(props: SearchBarProps) {
  return (
    <SearchBarContainer>
      <InputField
        placeholder='Search for images'
        onChange={(e) => props.onChange(e.target.value)}
      />
    </SearchBarContainer>
  )
}
