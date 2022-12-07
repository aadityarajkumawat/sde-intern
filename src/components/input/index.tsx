import React, { InputHTMLAttributes } from 'react'
import { tasty } from 'tastycss'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  flatRight: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputS = tasty({
  as: 'input',
  styles: {
    backgroundColor: '#efefef',
    border: '1px solid #b0b0b0',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    fontFamily: 'Inter',
    fontSize: '20px',
  },
  styleProps: ['borderTopRightRadius', 'borderBottomRightRadius'],
})

export function InputField(props: InputFieldProps) {
  const { flatRight, ...inputProps } = props

  const moreProps = flatRight
    ? { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
    : {}

  return <InputS {...inputProps} {...moreProps} />
}
