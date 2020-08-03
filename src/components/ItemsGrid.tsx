import React from 'react'
import Item from './Item'
import { ItemType } from '../data/items.type'
import { motion, AnimationControls } from 'framer-motion'

interface ItemsGridProps {
  animationControls?: AnimationControls
  handleKeyPressed: (event: React.KeyboardEvent) => void
  items: ItemType[]
  itemsPerPage: number
  selectedItemIndex: number | undefined
  setSelectedItem: (index: number | undefined) => void
}

const ItemsGrid: React.FC<ItemsGridProps> = (props) => {
  const {
    animationControls,
    handleKeyPressed,
    items,
    itemsPerPage,
    selectedItemIndex,
    setSelectedItem,
  } = props
  const itemsPage = [
    ...items,
    ...new Array(itemsPerPage - items.length).fill(undefined),
  ]

  return (
    <motion.div
      animate={animationControls}
      className="grid grid-cols-3 md:grid-cols-5 gap-6 outline-none"
      onKeyDown={handleKeyPressed}
      tabIndex={-1}
      transition={{
        x: { type: 'tween' },
        opacity: { duration: 0.2 },
      }}
    >
      {itemsPage.map((item: ItemType | undefined, index) => (
        <Item
          data={item}
          isSelected={index === selectedItemIndex}
          key={`${index}`}
          select={() => setSelectedItem(index)}
        />
      ))}
    </motion.div>
  )
}

export default ItemsGrid
