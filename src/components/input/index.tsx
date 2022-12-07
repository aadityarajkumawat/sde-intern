import React, { InputHTMLAttributes } from 'react'
import { tasty } from 'tastycss'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
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
})

export function InputField(props: InputFieldProps) {
  const { ...inputProps } = props
  return <InputS {...inputProps} />
}
