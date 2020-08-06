import { createSelector } from 'reselect'
import { ItemsPage, BonusType, BonusLevel } from '../data/items.type'
import { RootState } from '.'

export const getInventoryPages = (state: RootState): ItemsPage[] =>
  state.inventory.pages

export const getCurrentPageIndex = (state: RootState) =>
  state.inventory.currentPageIndex

export const getCurrentPage = createSelector(
  [getInventoryPages, getCurrentPageIndex],
  (pages, currentPageIndex) => pages[currentPageIndex],
)

export const getSelectedItemIndex = (state: RootState) =>
  state.inventory.selectedItemPageIndex

export const getPageSize = (state: RootState) => state.inventory.pageSize

export const getIsItemContextMenuOpen = (state: RootState) =>
  state.inventory.isItemContextMenuOpen

export const getEquipment = (state: RootState) => state.inventory.equipment

type EquipmentBonusLevel = Record<BonusType, BonusLevel>
export const getEquipmentBonus = createSelector(
  [getEquipment],
  (equipment): EquipmentBonusLevel =>
    Object.values(equipment).reduce(
      (acc, item) => {
        if (item?.bonus && Object.keys(acc).includes(item.bonus)) {
          acc[item.bonus]++
        }
        return acc
      },
      {
        [BonusType.Fire]: 0,
        [BonusType.Climbing]: 0,
        [BonusType.Swimming]: 0,
      } as EquipmentBonusLevel,
    ),
)
