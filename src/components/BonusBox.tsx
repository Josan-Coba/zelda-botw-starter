import cns from 'classnames'
import React from 'react'
import { BonusType, BonusLevel } from '../data/items.type'
import BonusIcon from './BonusIcon'

interface BonusBoxProps {
  level: BonusLevel
  type: BonusType
}

const BonusBox: React.FC<BonusBoxProps> = ({ level, type }) => {
  if (level === 0) {
    return null
  } else {
    return (
      <div className="flex flex-col items-center w-10 h-10 mt-2 mx-2">
        <BonusIcon type={type} />
        <div className="flex flex-row justify-between w-full mt-px">
          {[0, 1, 2].map((_, index) => {
            return (
              <div
                className={cns('w-3 h-1', {
                  'bg-zelda-blue': index < level,
                  'bg-zelda-darkGray': index >= level,
                })}
                key={index}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default BonusBox
