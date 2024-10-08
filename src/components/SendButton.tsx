import React from 'react'
import { Button } from "./ui/button"

interface SendButtonProps {
  onClick: () => void
  disabled?: boolean
}

export default function SendButton({ onClick, disabled }: SendButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="bg-[#D4AF37] hover:bg-[#C4A137] text-[#333333] font-serif px-4 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#5C4033] focus:ring-opacity-50"
      style={{
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.08)',
        backgroundImage: "url('/brass-texture.png')",
        backgroundBlendMode: 'multiply',
      }}
    >
      <span className="sr-only">Send</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
      </svg>
    </Button>
  )
}