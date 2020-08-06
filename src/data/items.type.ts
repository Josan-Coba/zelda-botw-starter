export enum ItemCategory {
  WEAPON = 'weapon',
  SHIELD = 'shield',
  ARMOR = 'armor',
  GREAVE = 'greave',
  HELM = 'helm',
}

export enum ItemMainCategory {
  WEAPON = 'weapon',
  SHIELD = 'shield',
  ARMOR = 'armor',
}

export enum BonusType {
  Climbing = 'climbing',
  Fire = 'fire',
  Swimming = 'swimming',
}

export type BonusLevel = 0 | 1 | 2 | 3

export type ItemType = {
  name: string
  category: ItemCategory
  icon: string
  value: string
  description: string
  bonus?: BonusType
  isNew?: boolean
}

export interface ItemsPage {
  items: ItemType[]
  mainCategory: ItemMainCategory
  page: number
}

type ItemsType = {
  [key in ItemMainCategory]: ItemType[]
}

export default ItemsType
