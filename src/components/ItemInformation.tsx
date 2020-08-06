import cx from 'classnames'
import React from 'react'
import { ItemType } from '../data/items.type'
import ItemCategoryIcon from './ItemCategoryIcon'
import TypeWriter from './TypeWriter'
import { useSelector } from 'react-redux'
import { getEquipment } from '../store/selectors'

interface ItemInformationProps {
  item: ItemType
}

const ItemInformation: React.FC<ItemInformationProps> = ({ item }) => {
  const { category, description, name, value } = item
  const equipment = useSelector(getEquipment)
  const equippedInSlot = equipment[item.category]
  const isEquipped = equippedInSlot === item

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
      {isEquipped && (
        <div className="absolute bg-zelda-blue top-0 left-0 bottom-0 w-1 m-2" />
      )}
      <div className="flex items-center my-2">
        <ItemCategoryIcon category={category} />
        {equippedInSlot && (
          <>
            <div className="border border-zelda-lightGray text-base py-1 px-2">
              {equippedInSlot.value}
            </div>
            <div className="text-lg mx-2 mb-1">→</div>
          </>
        )}
        <div className="border border-zelda-lightGray text-base py-1 px-2">
          {value}
        </div>
      </div>
      <div className="md:h-20 h-32">
        <TypeWriter text={description} />
      </div>
    </div>
  )
}

export default ItemInformation
