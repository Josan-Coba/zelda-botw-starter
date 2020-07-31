import React from 'react'
import Item from './Item'
import itemCollection from '../data/items'
import { ItemType } from '../data/items.type'
import { useSelectedItem } from './SelectedItemProvider'

interface ItemsGridProps {
  itemsPerPage: number
}

const ItemsGrid: React.FC<ItemsGridProps> = (props) => {
  const numColumnsGrid = 5
  const items: ItemType[] = itemCollection['weapons']
  const { itemsPerPage } = props
  const itemsPage = [
    ...items,
    ...new Array(itemsPerPage - items.length).fill(undefined),
  ]
  const [selectedItemIndex, selectItem] = useSelectedItem()

  const handleKeyPressed = React.useCallback(
    // TODO: Empty cells should probably not be selectable
    (e: React.KeyboardEvent) => {
      const index = selectedItemIndex ?? 0
      const row = Math.trunc(index / numColumnsGrid)
      const col = index % numColumnsGrid
      switch (e.key) {
        case 'ArrowLeft':
          selectItem(
            row * numColumnsGrid +
              ((numColumnsGrid + col - 1) % numColumnsGrid),
          )
          break
        case 'ArrowRight':
          selectItem(
            row * numColumnsGrid +
              ((numColumnsGrid + col + 1) % numColumnsGrid),
          )
          break
        case 'ArrowUp':
          selectItem(
            (itemsPerPage + (row - 1) * numColumnsGrid + col) % itemsPerPage,
          )
          break
        case 'ArrowDown':
          selectItem(
            (itemsPerPage + (row + 1) * numColumnsGrid + col) % itemsPerPage,
          )
          break
        case 'Escape':
        default:
          selectItem(undefined)
      }
    },
    [itemsPerPage, selectedItemIndex, selectItem],
  )

  return (
    <div
      className="grid grid-cols-3 md:grid-cols-5 gap-6 outline-none"
      onKeyDown={handleKeyPressed}
      tabIndex={-1}
    >
      {itemsPage.map((item: ItemType | undefined, index) => (
        <Item
          data={item}
          isSelected={index === selectedItemIndex}
          key={`${index}`}
          select={() => selectItem(index)}
        />
      ))}
    </div>
  )
}

export default ItemsGrid
