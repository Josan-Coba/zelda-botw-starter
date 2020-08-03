import React from 'react'
import { useWindupString } from 'windups'

interface TypeWriterProps {
  text: string
}

const TypeWriter: React.FC<TypeWriterProps> = ({ text }) => {
  const [windupText] = useWindupString(text, {
    pace: () => 6,
  })

  return <p>{windupText}</p>
}

export default TypeWriter
