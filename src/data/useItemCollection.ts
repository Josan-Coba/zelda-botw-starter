import { useMemo, useState } from 'react'
import itemCollection from './items'
import ItemsType, { ItemsPage, ItemMainCategory, ItemType } from './items.type'

type MainCategoryIndex = Record<ItemMainCategory, number>

export default function useItemCollection(
  pageSize: number = 20,
): [ItemsPage[], MainCategoryIndex] {
  const [collection] = useState<ItemsType>(itemCollection)

  return useMemo(() => {
    const collectionEntries = Object.entries(collection) as [
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

    return [pages, categoryIndex]
  }, [collection, pageSize])
}
