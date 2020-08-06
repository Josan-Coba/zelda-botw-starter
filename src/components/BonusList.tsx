import React from 'react'
import { useSelector } from 'react-redux'
import { getEquipmentBonus } from '../store/selectors'
import { BonusType } from '../data/items.type'
import BonusBox from './BonusBox'

interface BonusListProps {
  className?: string
}

const BonusList: React.FC<BonusListProps> = ({ className }) => {
  const equipmentBonus = useSelector(getEquipmentBonus)
  const bonusTypes = Object.keys(equipmentBonus) as BonusType[]

  return (
    <div className={className}>
      {bonusTypes.map((bonusType: BonusType) => (
        <BonusBox
          key={bonusType}
          level={equipmentBonus[bonusType]}
          type={bonusType}
        />
      ))}
    </div>
  )
}

export default BonusList
