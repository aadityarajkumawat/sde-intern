import { tasty } from 'tastycss'
import { Button } from '../button'
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
        onChange={(e) => props.onChange(e.target.value)}
        flatRight={true}
      />
      <Button text='Search' borderLeft='0px' leftFlat={true} />
    </SearchBarContainer>
  )
}
