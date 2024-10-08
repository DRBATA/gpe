import React from 'react'
import { Input } from "./ui/input"

interface InputFieldProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export default function InputField({ value, onChange, disabled }: InputFieldProps) {
  return (
    <div className="relative">
      <Input
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="Write your message here..."
        className="w-full pl-10 pr-4 py-2 bg-[#F5E6D3] border-2 border-[#5C4033] rounded-md text-[#333333] placeholder-[#5C4033] font-handwriting focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
      />
      <div
        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[url('/quill-pen.png')] bg-contain bg-no-repeat"
        aria-hidden="true"
      ></div>
    </div>
  )
}