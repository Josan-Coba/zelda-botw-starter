import { motion, AnimationControls } from 'framer-motion'
import React, { useCallback } from 'react'
import Item from './Item'
import { ItemType } from '../data/items.type'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../store'
import { openItemContextMenu, selectItem } from '../store/actions'
import {
  getCurrentPage,
  getPageSize,
  getSelectedItemIndex,
  getIsItemContextMenuOpen,
  getEquipment,
} from '../store/selectors'
import { usePlayAction } from '../hooks/sound'

interface ItemsGridProps {
  animationControls?: AnimationControls
  onTouchStart?: React.TouchEventHandler
  onTouchEnd?: React.TouchEventHandler
}

const ItemsGrid: React.FC<ItemsGridProps> = (props) => {
  const { animationControls, onTouchStart, onTouchEnd } = props
  const dispatch = useAppDispatch()
  const itemsPerPage = useSelector(getPageSize)
  const selectedItemIndex = useSelector(getSelectedItemIndex)
  const isItemContextMenuOpen = useSelector(getIsItemContextMenuOpen)
  const equipment = useSelector(getEquipment)
  const currentPage = useSelector(getCurrentPage)
  const { items } = currentPage
  const itemsPage = [
    ...items,
    ...new Array(itemsPerPage - items.length).fill(undefined),
  ]
  const playAction = usePlayAction()

  const select = useCallback(
    (index) => {
      playAction()
      if (selectedItemIndex !== index) {
        dispatch(selectItem(index))
      } else {
        dispatch(openItemContextMenu())
      }
    },
    [dispatch, selectedItemIndex, playAction],
  )

  return (
    <motion.div
      animate={animationControls}
      className="grid grid-cols-3 md:grid-cols-5 gap-6"
      transition={{
        x: { type: 'tween' },
        opacity: { duration: 0.2 },
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {itemsPage.map((item: ItemType | undefined, index) => (
        <Item
          data={item}
          isContextMenuOpen={
            isItemContextMenuOpen && index === selectedItemIndex
          }
          isEquipped={!!item && equipment[item.category] === item}
          isSelected={index === selectedItemIndex}
          key={`${item?.name ?? index}`}
          select={() => select(index)}
        />
      ))}
    </motion.div>
  )
}

export default ItemsGrid
