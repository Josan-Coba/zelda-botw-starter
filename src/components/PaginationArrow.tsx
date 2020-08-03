import classnames from 'classnames'
import React, { useCallback } from 'react'
import { ArrowNoCurve } from './icons'

export enum ArrowDirection {
  Left = 'left',
  Right = 'right',
}

interface PaginationArrowProps {
  direction: ArrowDirection
  disabled?: boolean
  onClick?: (direction: ArrowDirection) => void
}

const PaginationArrow: React.FC<PaginationArrowProps> = ({
  disabled = false,
  direction,
  onClick,
}) => {
  const isRight = direction === ArrowDirection.Right
  const isLeft = direction === ArrowDirection.Left
  const navigate = useCallback(() => {
    if (typeof onClick !== 'undefined' && !disabled) {
      onClick(direction)
    }
  }, [direction, disabled, onClick])

  return (
    <div
      className={classnames('absolute z-30 hidden md:block', {
        'right-0': isRight,
        'left-0': isLeft,
      })}
      onClick={navigate}
    >
      <ArrowNoCurve
        initial={false}
        animate={{
          scale: disabled ? [1, 1, 1] : [1, 1.2, 1],
          scaleX: isLeft ? -1 : 1,
        }}
        className={classnames('h-16', {
          'opacity-50': disabled,
          'cursor-pointer': !disabled,
        })}
        transform={isLeft ? 'rotate(180)' : ''}
        transition={{
          loop: Infinity,
          ease: 'easeIn',
          duration: 1,
        }}
      />
    </div>
  )
}

export default PaginationArrow
