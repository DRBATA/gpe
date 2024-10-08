import React, { useState, useEffect } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { Loader2 } from "lucide-react"

const HealthChatbot = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { text: "Welcome to the Old English Village GP. How may I assist you today?", isUser: false }
  ])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const scrollArea = document.querySelector('.scroll-area')
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages(prev => [...prev, { text: input, isUser: true }])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      })
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      setMessages(prev => [...prev, { text: data.response, isUser: false }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { text: 'My apologies, there seems to be an issue. Please try again.', isUser: false }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-[#F5E6D3] border-[#5C4033] border-4 rounded-lg shadow-lg overflow-hidden">
      <CardHeader className="bg-[#5C4033] text-[#F5E6D3] p-4">
        <h2 className="text-2xl font-serif text-center">Old English Village GP</h2>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[400px] pr-4 scroll-area">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block max-w-[80%] px-4 py-2 rounded-lg ${
                  message.isUser
                    ? 'bg-[#F5E6D3] text-[#333333] font-handwriting'
                    : 'bg-white text-[#333333] font-typewriter'
                }`}
                style={{
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                  backgroundImage: "url('/paper-texture.png')",
                  backgroundBlendMode: 'multiply',
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 bg-[#2F4F4F] border-t-2 border-[#D4AF37]">
        <form onSubmit={handleSubmit} className="w-full flex space-x-2">
          <div className="relative flex-grow">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your ailments..."
              className="w-full pl-10 pr-4 py-2 bg-[#F5E6D3] border-2 border-[#5C4033] rounded-md text-[#333333] placeholder-[#5C4033] font-handwriting focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
            />
            <div
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[url('/quill-pen.png')] bg-contain bg-no-repeat"
              aria-hidden="true"
            ></div>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#D4AF37] hover:bg-[#C4A137] text-[#333333] font-serif px-4 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#5C4033] focus:ring-opacity-50"
            style={{
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.08)',
              backgroundImage: "url('/brass-texture.png')",
              backgroundBlendMode: 'multiply',
            }}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <span className="sr-only">Send</span>
            )}
            {!isLoading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

export default HealthChatbot