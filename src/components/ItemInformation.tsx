import cx from 'classnames'
import React from 'react'
import { ItemType } from '../data/items.type'
import ItemCategoryIcon from './ItemCategoryIcon'
import TypeWriter from './TypeWriter'

interface ItemInformationProps {
  item: ItemType
}

const ItemInformation: React.FC<ItemInformationProps> = ({ item }) => {
  const { category, description, name, value } = item
  return (
    <div
      className={cx(
        'bg-zelda-bgBlackTransparent border border-zelda-darkGray',
        'text-white text-sm px-6 py-2 relative',
        'w-full max-w-xs md:max-w-lg z-10',
      )}
    >
      <h2 className="border-b border-zelda-darkGray text-lg font-bold mb-1 pb-1">
        {name}
      </h2>
      <div className="flex items-center">
        <ItemCategoryIcon category={category} />
        <div className="border border-zelda-lightGray text-base py-1 px-2">
          {value}
        </div>
      </div>
      <div className="h-20">
        <TypeWriter text={description} />
      </div>
    </div>
  )
}

export default ItemInformation
