import { ButtonHTMLAttributes } from 'react'
import { tasty } from 'tastycss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  leftFlat?: boolean
  borderLeft?: string
}

const ButtonS = tasty({
  as: 'button',
  styles: {
    backgroundColor: '#efefef',
    border: '1px solid #b0b0b0',
    padding: '0.5rem 1rem',
    fontFamily: 'Inter',
    fontSize: '20px',
    borderRadius: '5px',
  },
  styleProps: ['borderLeft', 'borderTopLeftRadius', 'borderBottomLeftRadius'],
})

export function Button(props: ButtonProps) {
  const { text, ...buttonProps } = props

  const moreProps = props.leftFlat
    ? {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      }
    : {}

  return (
    <ButtonS {...buttonProps} {...moreProps}>
      {text}
    </ButtonS>
  )
}
