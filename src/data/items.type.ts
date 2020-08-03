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

export type ItemType = {
  name: string
  category: ItemCategory
  icon: string
  value: string
  description: string
  bonus?: string
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
