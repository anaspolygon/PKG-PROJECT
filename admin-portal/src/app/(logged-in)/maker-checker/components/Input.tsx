import React from 'react'

interface InputProps {
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  className?: string
  disabled?: boolean
  onFocus?: () => void
  onBlur?: () => void
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
  onFocus,
  onBlur,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${className} ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default Input
