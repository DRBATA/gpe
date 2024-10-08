import React from 'react'
import { Card } from "./ui/card"

export default function ChatContainer({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-[#F5E6D3] border-[#5C4033] border-4 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 bg-[url('/wood-texture.png')] bg-repeat">
        <div className="bg-[#F5E6D3] bg-opacity-90 rounded-lg p-4 shadow-inner">
          {children}
        </div>
      </div>
      <div className="h-4 bg-[#5C4033] border-t-4 border-[#D4AF37]"></div>
    </Card>
  )
}