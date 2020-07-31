import classNames from 'classnames'
import React from 'react'
import { motion } from 'framer-motion'

export enum TrianglePosition {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
}

interface TriangleProps {
  position: TrianglePosition
}

const Triangle: React.FC<TriangleProps> = ({ position }) => {
  const isTop =
    position === TrianglePosition.TopLeft ||
    position === TrianglePosition.TopRight
  const isBottom =
    position === TrianglePosition.BottomLeft ||
    position === TrianglePosition.BottomRight
  const isLeft =
    position === TrianglePosition.TopLeft ||
    position === TrianglePosition.BottomLeft
  const isRight =
    position === TrianglePosition.TopRight ||
    position === TrianglePosition.BottomRight

  const classes = classNames('absolute -mx-1 z-10', {
    'zelda-botw-triangle-up': isTop,
    'zelda-botw-triangle-down': isBottom,
    'top-0': isTop,
    'bottom-0': isBottom,
    'left-0': isLeft,
    'right-0': isRight,
  })
  const x = [0, isLeft ? -6 : 6, 0]
  const y = [0, isTop ? -6 : 6, 0]
  const rotate = (isTop && isLeft) || (isBottom && isRight) ? '-45deg' : '45deg'
  return (
    <motion.div
      animate={{ rotate, x, y }}
      className={classes}
      initial={false}
      transition={{
        duration: 1,
        ease: 'easeIn',
        loop: Infinity,
      }}
    />
  )
}

export default Triangle
