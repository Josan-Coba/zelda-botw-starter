import React from 'react'
import Triangle, { TrianglePosition } from './Triangle'

const TriangleBox: React.FC = () => {
  return (
    <>
      <Triangle position={TrianglePosition.TopLeft} />
      <Triangle position={TrianglePosition.TopRight} />
      <Triangle position={TrianglePosition.BottomLeft} />
      <Triangle position={TrianglePosition.BottomRight} />
    </>
  )
}

export default TriangleBox
