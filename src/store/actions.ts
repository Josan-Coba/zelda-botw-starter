import { createAction } from '@reduxjs/toolkit'
import { ItemMainCategory } from '../data/items.type'

export const nextPage = createAction('NEXT_PAGE')
export const prevPage = createAction('PREV_PAGE')
export const categoryPage = createAction(
  'CATEGORY_PAGE',
  (payload: ItemMainCategory) => ({ payload }),
)

export const unselectItem = createAction('UNSELECT_ITEM')
export const selectItem = createAction('SELECT_ITEM', (payload: number) => ({
  payload,
}))

export const openItemContextMenu = createAction('OPEN_ITEM_CONTEXT_MENU')
export const closeItemContextMenu = createAction('CLOSE_ITEM_CONTEXT_MENU')

export const equipSelectedItem = createAction('EQUIP_SELECTED_ITEM')
export const dropSelectedItem = createAction('DROP_SELECTED_ITEM')
// export const unequipItem = createAction(
//   'UNEQUIP_ITEM',
//   (payload: ItemCategory) => ({ payload }),
// )
