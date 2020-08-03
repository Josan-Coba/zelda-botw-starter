import React from 'react'
import { ReactComponent as Armor } from '../assets/items/armor.svg'
import { ReactComponent as Shield } from '../assets/items/shield.svg'
import { ReactComponent as Sword } from '../assets/items/sword.svg'
import { ItemCategory } from '../data/items.type'

const categoryMapping = {
  [ItemCategory.WEAPON]: Sword,
  [ItemCategory.SHIELD]: Shield,
  [ItemCategory.ARMOR]: Armor,
  [ItemCategory.HELM]: Armor,
  [ItemCategory.GREAVE]: Armor,
}

interface ItemCategoryIconProps {
  category: ItemCategory
}

const ItemCategoryIcon: React.FC<ItemCategoryIconProps> = ({ category }) => {
  const CategoryIcon = categoryMapping[category]

  return <CategoryIcon className="fill-current w-10 px-3 text-white" />
}

export default ItemCategoryIcon
