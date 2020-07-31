import classNames from 'classnames'
import React from 'react'
import { ItemType } from '../data/items.type'
import TriangleBox from './TriangleBox'

interface ItemProps {
  data?: ItemType
  isSelected?: boolean
  select?: () => void
}

const Item: React.FC<ItemProps> = (props) => {
  const { data, isSelected = false, select } = props
  const isSelectable =
    typeof data !== 'undefined' && typeof select !== 'undefined'

  return (
    <div
      className={classNames(
        'relative border border-zelda-darkGray bg-black w-20 h-20',
        {
          'cursor-pointer': isSelectable,
          'shadow-yellow': isSelected,
          'border-zelda-softYellow': isSelected,
        },
      )}
      onClick={isSelectable ? select : undefined}
    >
      {data && (
        <>
          <img alt={data.name} src={data.icon} />
          <div className="absolute right-0 bottom-0 -mx-1 -my-1 z-0 text-white text-sm italic border border-zelda-darkGray bg-black px-2">
            {data.value}
          </div>
        </>
      )}
      {isSelected && <TriangleBox />}
    </div>
  )
}

export default Item
