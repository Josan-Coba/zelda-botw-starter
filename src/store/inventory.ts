import { createReducer } from '@reduxjs/toolkit'
import { original } from 'immer'
import itemsByCategory from '../data/items'
import {
  ItemCategory,
  ItemMainCategory,
  ItemsPage,
  ItemType,
} from '../data/items.type'
import {
  nextPage,
  prevPage,
  categoryPage,
  unselectItem,
  selectItem,
  openItemContextMenu,
  closeItemContextMenu,
  equipSelectedItem,
  dropSelectedItem,
} from './actions'

type EquipmentState = {
  [key in ItemCategory]: ItemType | undefined
}

interface InventoryState {
  // contextMenuIndex: number
  currentPageIndex: number
  equipment: EquipmentState
  gridColumns: 5 | 3
  isItemContextMenuOpen: boolean
  pageSize: number
  pages: ItemsPage[]
  selectedItemPageIndex: number | undefined
}

const inventory = createReducer<InventoryState>(
  getInitialInventoryState(),
  (builder) =>
    builder
      .addCase(nextPage, (state) =>
        state.currentPageIndex < state.pages.length - 1
          ? { ...state, currentPageIndex: state.currentPageIndex + 1 }
          : state,
      )
      .addCase(prevPage, (state) =>
        state.currentPageIndex > 0
          ? { ...state, currentPageIndex: state.currentPageIndex - 1 }
          : state,
      )
      .addCase(categoryPage, (state, { payload }) => {
        const categoryIndex = state.pages.findIndex(
          ({ mainCategory }) => mainCategory === payload,
        )
        return state.currentPageIndex !== categoryIndex
          ? { ...state, currentPageIndex: categoryIndex }
          : state
      })
      .addCase(unselectItem, (state) =>
        typeof state.selectedItemPageIndex !== 'undefined'
          ? {
              ...state,
              isItemContextMenuOpen: false,
              selectedItemPageIndex: undefined,
            }
          : state,
      )
      .addCase(selectItem, (state, { payload }) =>
        state.selectedItemPageIndex !== payload
          ? {
              ...state,
              isItemContextMenuOpen: false,
              selectedItemPageIndex: payload,
            }
          : state,
      )
      .addCase(openItemContextMenu, (state) =>
        !state.isItemContextMenuOpen
          ? { ...state, isItemContextMenuOpen: true }
          : state,
      )
      .addCase(closeItemContextMenu, (state) =>
        state.isItemContextMenuOpen
          ? { ...state, isItemContextMenuOpen: false }
          : state,
      )
      .addCase(equipSelectedItem, (state) => {
        if (typeof state.selectedItemPageIndex !== 'undefined') {
          const selectedItem =
            state.pages[state.currentPageIndex].items[
              state.selectedItemPageIndex
            ]
          const equippedItem = state.equipment[selectedItem.category]
          if (
            typeof selectedItem !== 'undefined' &&
            typeof equippedItem !== 'undefined' &&
            original(equippedItem) === original(selectedItem)
          ) {
            state.equipment[selectedItem.category] = undefined
          } else {
            state.equipment[selectedItem.category] = selectedItem
          }
          state.isItemContextMenuOpen = false
        }
      })
      .addCase(dropSelectedItem, (state) => {
        if (typeof state.selectedItemPageIndex !== 'undefined') {
          const selectedItem =
            state.pages[state.currentPageIndex].items[
              state.selectedItemPageIndex
            ]
          if (state.equipment[selectedItem.category] === selectedItem) {
            state.equipment[selectedItem.category] = undefined
          }
          state.pages[state.currentPageIndex].items.splice(
            state.selectedItemPageIndex,
            1,
          )
          state.selectedItemPageIndex = Math.min(
            state.selectedItemPageIndex,
            state.pages[state.currentPageIndex].items.length - 1,
          )
          state.isItemContextMenuOpen = false
        }
      }),
)

export default inventory

type MainCategoryIndex = Record<ItemMainCategory, number>

function getInitialInventoryState(): InventoryState {
  const pageSize = 20
  const collectionEntries = Object.entries(itemsByCategory) as [
    ItemMainCategory,
    ItemType[],
  ][]
  const categoryIndex: MainCategoryIndex = {
    [ItemMainCategory.WEAPON]: 0,
    [ItemMainCategory.SHIELD]: 0,
    [ItemMainCategory.ARMOR]: 0,
  }
  const pages: ItemsPage[] = collectionEntries.reduce(
    (acc: ItemsPage[], [mainCategory, categoryItems]) => {
      const categoryPages = Math.ceil(categoryItems.length / pageSize)
      categoryIndex[mainCategory] = acc.length
      return [
        ...acc,
        ...Array.from({ length: categoryPages }).map((_, i) => ({
          items: categoryItems.slice(i * pageSize, i * pageSize + pageSize),
          mainCategory,
          page: i + acc.length,
        })),
      ]
    },
    [] as ItemsPage[],
  )
  return {
    currentPageIndex: 0,
    equipment: {
      [ItemCategory.ARMOR]: undefined,
      [ItemCategory.GREAVE]: undefined,
      [ItemCategory.HELM]: undefined,
      [ItemCategory.SHIELD]: undefined,
      [ItemCategory.WEAPON]: undefined,
    },
    gridColumns: 5,
    isItemContextMenuOpen: false,
    pageSize,
    pages,
    selectedItemPageIndex: undefined,
  }
}
