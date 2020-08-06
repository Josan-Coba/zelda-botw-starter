import classNames from 'classnames'
import React from 'react'
import { Armor, Shield, Sword } from './icons'
import { ItemMainCategory } from '../data/items.type'
import { usePlayAction } from '../hooks/sound'

const categoryMapping = {
  [ItemMainCategory.WEAPON]: Sword,
  [ItemMainCategory.SHIELD]: Shield,
  [ItemMainCategory.ARMOR]: Armor,
}

interface CategoriesMenuProps {
  currentCategory: ItemMainCategory
  navigateToCategory: (category: ItemMainCategory) => void
}

const CategoriesMenu: React.FC<CategoriesMenuProps> = (props) => {
  const { currentCategory, navigateToCategory } = props
  const mainCategoryList: [ItemMainCategory, typeof Sword | typeof Armor][] = [
    [ItemMainCategory.WEAPON, Sword],
    [ItemMainCategory.SHIELD, Shield],
    [ItemMainCategory.ARMOR, Armor],
  ]
  const playAction = usePlayAction()

  return (
    <div className="flex flex-row justify-center items-center mb-6 z-20">
      {mainCategoryList.map(([category, _]) => {
        const CategoryIcon = categoryMapping[category]
        const isSelected = currentCategory === category

        const classes = classNames(
          'fill-current stroke-current h-10 w-16 border-b cursor-pointer pb-3 px-4',
          {
            'text-white border-white': isSelected,
            'text-zelda-lightGray border-zelda-lightGray': !isSelected,
          },
        )
        return (
          <CategoryIcon
            className={classes}
            key={category}
            onClick={() => {
              playAction()
              navigateToCategory(category)
            }}
          />
        )
      })}
    </div>
  )
}

export default CategoriesMenu
