import classNames from 'classnames'
import React, { useRef, useCallback } from 'react'
import { ItemType } from '../data/items.type'
import TriangleBox from './TriangleBox'
import ContextMenu from './ContextMenu'
import BonusIcon from './BonusIcon'
import SparkleAnimation from './SparkleAnimation'

interface ItemProps {
  data?: ItemType
  isContextMenuOpen: boolean
  isEquipped: boolean
  isSelected: boolean
  select?: () => void
}

const Item: React.FC<ItemProps> = (props) => {
  const {
    data,
    isContextMenuOpen,
    isEquipped,
    isSelected = false,
    select,
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const isSelectable =
    typeof data !== 'undefined' && typeof select !== 'undefined'

  const onContextMenuClose = useCallback(() => {
    ref.current?.focus()
  }, [])

  return (
    <div
      className={classNames(
        'relative border border-zelda-darkGray bg-black w-20 h-20 outline-none',
        {
          'cursor-pointer': isSelectable,
          'shadow-yellow': isSelected,
          'border-zelda-softYellow': isSelected,
          'zelda-background-item': isEquipped,
        },
      )}
      onClick={isSelectable ? select : undefined}
      ref={ref}
      tabIndex={0}
    >
      {data && (
        <>
          <img alt={data.name} src={data.icon} />
          {data.bonus && (
            <BonusIcon className="absolute top-0 left-0" type={data.bonus} />
          )}
          <div className="absolute right-0 bottom-0 -mx-1 -my-1 z-0 text-white text-sm border border-zelda-darkGray bg-black px-2">
            {data.value}
          </div>
        </>
      )}
      {data?.isNew && <SparkleAnimation />}
      {isSelected && !isContextMenuOpen && <TriangleBox />}
      {isContextMenuOpen && <ContextMenu onClose={onContextMenuClose} />}
    </div>
  )
}

export default Item
