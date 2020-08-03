import React, { useState, useCallback } from 'react'
import linkImage from './assets/bg.png'
import ItemsGrid from './components/ItemsGrid'
import ItemInformation from './components/ItemInformation'
import useItemCollection from './data/useItemCollection'
import CategoriesMenu from './components/CategoriesMenu'
import { ItemMainCategory, ItemsPage } from './data/items.type'
import PaginationArrow, { ArrowDirection } from './components/PaginationArrow'
import { useAnimation } from 'framer-motion'

function App() {
  const itemsPerPage = 20
  const numColumnsGrid = 5
  const controls = useAnimation()
  const [itemCollection, categoryIndex] = useItemCollection(itemsPerPage)
  const [currentPage, setCurrentPage] = useState<ItemsPage>(itemCollection[0])
  const [selectedItemIndex, setSelectedItemIndex] = useState<
    number | undefined
  >(undefined)
  const items = currentPage.items

  const navigateToCategory = useCallback(
    async (category: ItemMainCategory) => {
      if (category !== currentPage.mainCategory) {
        await controls.start({ opacity: 0 })
        setCurrentPage(itemCollection[categoryIndex[category]])
        await controls.start({ opacity: 1 })
      }
    },
    [categoryIndex, controls, currentPage, itemCollection],
  )
  const navigatePageLeft = useCallback(async () => {
    await controls.start({ x: -100, opacity: 0 }, { duration: 0.2 })
    setCurrentPage((prevPage) =>
      prevPage.page > 0 ? itemCollection[prevPage.page - 1] : prevPage,
    )
    await controls.start({ x: 100, opacity: 0 }, { duration: 0 })
    await controls.start({ x: 0, opacity: 1 }, { duration: 0.2 })
  }, [controls, itemCollection])
  const navigatePageRight = useCallback(async () => {
    await controls.start({ x: 100, opacity: 0 }, { duration: 0.2 })
    setCurrentPage((prevPage) =>
      prevPage.page < itemCollection.length - 1
        ? itemCollection[prevPage.page + 1]
        : prevPage,
    )
    await controls.start({ x: -100, opacity: 0 }, { duration: 0 })
    await controls.start({ x: 0, opacity: 1 }, { duration: 0.2 })
  }, [controls, itemCollection])

  const handleKeyPressed = useCallback(
    // TODO: Empty cells should probably not be selectable?
    (e: React.KeyboardEvent) => {
      const index = selectedItemIndex ?? 0
      const row = Math.trunc(index / numColumnsGrid)
      const col = index % numColumnsGrid
      let nextIndex
      switch (e.key) {
        case 'ArrowLeft':
          nextIndex =
            row * numColumnsGrid + ((numColumnsGrid + col - 1) % numColumnsGrid)
          if (
            typeof selectedItemIndex !== 'undefined' &&
            nextIndex > selectedItemIndex
          ) {
            navigatePageLeft()
          }
          break
        case 'ArrowRight':
          nextIndex =
            row * numColumnsGrid + ((numColumnsGrid + col + 1) % numColumnsGrid)
          if (
            typeof selectedItemIndex !== 'undefined' &&
            nextIndex < selectedItemIndex
          ) {
            navigatePageRight()
          }
          break
        case 'ArrowUp':
          nextIndex =
            (itemsPerPage + (row - 1) * numColumnsGrid + col) % itemsPerPage
          break
        case 'ArrowDown':
          nextIndex =
            (itemsPerPage + (row + 1) * numColumnsGrid + col) % itemsPerPage

          break
        case 'Escape':
        default:
          nextIndex = undefined
      }
      setSelectedItemIndex(nextIndex)
    },
    [itemsPerPage, selectedItemIndex, navigatePageLeft, navigatePageRight],
  )

  return (
    <div className="min-h-screen bg-zelda-darkGreen pt-10 font-calamity">
      <div className="container mx-auto flex flex-col xl:flex-row">
        <div className="flex flex-col justify-center items-center w-full max-w-2xl xl:w-1/2 relative xl:px-12 mx-auto">
          <CategoriesMenu
            currentCategory={currentPage.mainCategory}
            navigateToCategory={navigateToCategory}
          />
          <ItemsGrid
            animationControls={controls}
            handleKeyPressed={handleKeyPressed}
            items={items}
            itemsPerPage={itemsPerPage}
            selectedItemIndex={selectedItemIndex}
            setSelectedItem={setSelectedItemIndex}
          />
          <PaginationArrow
            direction={ArrowDirection.Left}
            disabled={currentPage.page === 0}
            onClick={navigatePageLeft}
          />
          <PaginationArrow
            direction={ArrowDirection.Right}
            disabled={currentPage.page === itemCollection.length - 1}
            onClick={navigatePageRight}
          />
        </div>
        <div className="flex flex-col items-center w-full xl:w-1/2 my-6 xl:my-0 self-end">
          <img
            alt=""
            className="absolute hidden xl:block top-0 z-0"
            src={linkImage}
          />
          {typeof selectedItemIndex !== 'undefined' &&
            items[selectedItemIndex] && (
              <ItemInformation item={items[selectedItemIndex]} />
            )}
        </div>
      </div>
    </div>
  )
}

export default App
