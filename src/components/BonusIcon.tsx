import React from 'react'
import { BonusType } from '../data/items.type'
import { Mountain, Fire, Water } from './icons'

interface BonusIconProps {
  className?: string
  type: BonusType
}

const iconMapping = {
  [BonusType.Climbing]: Mountain,
  [BonusType.Fire]: Fire,
  [BonusType.Swimming]: Water,
}

const BonusIcon: React.FC<BonusIconProps> = ({ className, type }) => {
  const Icon = iconMapping[type]

  if (typeof Icon === 'undefined') {
    return null
  }

  return (
    <div className={className}>
      <Icon className="w-5 h-5 m-1" />
    </div>
  )
}

export default BonusIcon
