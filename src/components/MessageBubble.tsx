import React from 'react'

interface MessageBubbleProps {
  message: string
  isUser: boolean
}

export default function MessageBubble({ message, isUser }: MessageBubbleProps) {
  return (
    <div className={`mb-4 ${isUser ? 'text-right' : 'text-left'}`}>
      <div
        className={`inline-block max-w-[80%] px-4 py-2 rounded-lg ${
          isUser
            ? 'bg-[#F5E6D3] text-[#333333] font-handwriting'
            : 'bg-white text-[#333333] font-typewriter'
        }`}
        style={{
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
          backgroundImage: "url('/paper-texture.png')",
          backgroundBlendMode: 'multiply',
        }}
      >
        {message}
      </div>
    </div>
  )
}