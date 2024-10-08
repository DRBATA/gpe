import React from 'react'
import { ScrollArea } from "./ui/scroll-area"
import { css, Global } from '@emotion/react'

interface CustomScrollbarProps {
  children: React.ReactNode
}

const globalStyles = css`
  .scrollbar {
    width: 12px;
    background-color: #F5E6D3;
    border-left: 2px solid #5C4033;
  }
  .scrollbar-thumb {
    background-color: #5C4033;
    border-radius: 6px;
    background-image: url('/leather-texture.png');
    background-blend-mode: multiply;
  }
  .scrollbar-thumb:hover {
    background-color: #4C3023;
  }
`

export default function CustomScrollbar({ children }: CustomScrollbarProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <ScrollArea className="h-[400px] pr-4">
        <div className="mr-4">{children}</div>
      </ScrollArea>
    </>
  )
}