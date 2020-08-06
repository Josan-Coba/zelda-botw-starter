import { useAnimation } from 'framer-motion'
import React, { useCallback, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import linkImage from './assets/bg.png'
import CategoriesMenu from './components/CategoriesMenu'
import ItemsGrid from './components/ItemsGrid'
import ItemInformation from './components/ItemInformation'
import PaginationArrow, { ArrowDirection } from './components/PaginationArrow'
import { ItemMainCategory } from './data/items.type'
import { useAppDispatch } from './store'
import {
  prevPage,
  nextPage,
  categoryPage,
  selectItem,
  unselectItem,
  openItemContextMenu,
} from './store/actions'
import {
  getInventoryPages,
  getCurrentPage,
  getPageSize,
  getSelectedItemIndex,
} from './store/selectors'
import BonusList from './components/BonusList'
import { usePlayAction, usePlaySelect } from './hooks/sound'
import EnduranceGauge from './components/EnduranceGauge'

function App() {
  const ref = useRef<HTMLDivElement>(null)
  const numColumnsGrid = 5
  const controls = useAnimation()

  const dispatch = useAppDispatch()
  const itemsPerPage = useSelector(getPageSize)
  const itemCollection = useSelector(getInventoryPages)
  const currentPage = useSelector(getCurrentPage)
  const { items } = currentPage
  const selectedItemIndex = useSelector(getSelectedItemIndex)
  const playAction = usePlayAction()
  const playSelect = usePlaySelect()

  const navigateToCategory = useCallback(
    async (category: ItemMainCategory) => {
      if (category !== currentPage.mainCategory) {
        await controls.start({ opacity: 0 })
        dispatch(categoryPage(category))
        await controls.start({ opacity: 1 })
      }
    },
    [controls, currentPage, dispatch],
  )

  const navigatePageLeft = useCallback(async () => {
    if (currentPage.page > 0) {
      await controls.start({ x: 100, opacity: 0 }, { duration: 0.2 })
      dispatch(prevPage())
      await controls.start({ x: -100, opacity: 0 }, { duration: 0 })
      await controls.start({ x: 0, opacity: 1 }, { duration: 0.2 })
    }
  }, [controls, currentPage, dispatch])

  const navigatePageRight = useCallback(async () => {
    if (currentPage.page < itemCollection.length - 1) {
      await controls.start({ x: -100, opacity: 0 }, { duration: 0.2 })
      dispatch(nextPage())
      await controls.start({ x: 100, opacity: 0 }, { duration: 0 })
      await controls.start({ x: 0, opacity: 1 }, { duration: 0.2 })
    }
  }, [controls, currentPage, itemCollection, dispatch])

  const handleKeyPressed = useCallback(
    // TODO: Empty cells should probably not be selectable?
    (event: React.KeyboardEvent) => {
      const recognizedKeys = [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Enter',
        'Escape',
      ]
      if (recognizedKeys.includes(event.key)) {
        event.stopPropagation()
        event.preventDefault()
      }
      if (typeof selectedItemIndex === 'undefined') {
        dispatch(selectItem(0))
      } else {
        const row = Math.trunc(selectedItemIndex / numColumnsGrid)
        const col = selectedItemIndex % numColumnsGrid
        switch (event.key) {
          case 'ArrowLeft':
            playSelect()
            dispatch(
              selectItem(
                row * numColumnsGrid +
                  ((numColumnsGrid + col - 1) % numColumnsGrid),
              ),
            )
            if (selectedItemIndex % numColumnsGrid === 0) {
              navigatePageLeft()
            }
            break
          case 'ArrowRight':
            playSelect()
            dispatch(
              selectItem(
                row * numColumnsGrid +
                  ((numColumnsGrid + col + 1) % numColumnsGrid),
              ),
            )
            if (selectedItemIndex % numColumnsGrid === numColumnsGrid - 1) {
              navigatePageRight()
            }
            break
          case 'ArrowUp':
            playSelect()
            dispatch(
              selectItem(
                (itemsPerPage + (row - 1) * numColumnsGrid + col) %
                  itemsPerPage,
              ),
            )
            break
          case 'ArrowDown':
            playSelect()
            dispatch(
              selectItem(
                (itemsPerPage + (row + 1) * numColumnsGrid + col) %
                  itemsPerPage,
              ),
            )
            break
          case 'Enter':
            dispatch(openItemContextMenu())
            playAction()
            break
          case 'Escape':
          // fallsthrough
          default:
            dispatch(unselectItem())
            break
        }
      }
    },
    [
      dispatch,
      itemsPerPage,
      selectedItemIndex,
      navigatePageLeft,
      navigatePageRight,
      playAction,
      playSelect,
    ],
  )

  const touchStart = useRef<React.Touch | undefined>(undefined)
  const onTouchStart = useCallback((event: React.TouchEvent) => {
    touchStart.current = event.changedTouches[0]
  }, [])
  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (typeof touchStart.current !== 'undefined') {
        const end = event.changedTouches[0]
        const start = touchStart.current
        const deltaX = end.clientX - start.clientX
        const deltaY = end.clientY - start.clientY
        if (
          Math.abs(deltaX) > Math.abs(deltaY) &&
          Math.abs(deltaX) > 0.4 * window.innerWidth
        ) {
          if (deltaX < 0) {
            navigatePageRight()
          } else {
            navigatePageLeft()
          }
        }
      }
      touchStart.current = undefined
    },
    [navigatePageLeft, navigatePageRight],
  )

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <div
      className="min-h-screen bg-zelda-darkGreen pt-10 font-calamity"
      onKeyDown={handleKeyPressed}
      ref={ref}
      tabIndex={-1}
    >
      <div className="container mx-auto flex flex-col xl:flex-row">
        <div className="flex flex-col justify-center items-center w-full max-w-2xl xl:w-1/2 relative xl:px-12 mx-auto">
          <CategoriesMenu
            currentCategory={currentPage.mainCategory}
            navigateToCategory={navigateToCategory}
          />
          <ItemsGrid
            animationControls={controls}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
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
        <div className="flex flex-col items-center xl:items-start w-full xl:w-1/2 my-4 xl:my-0 self-end">
          <img
            alt=""
            className="absolute hidden xl:block top-0 z-0 ml-48"
            src={linkImage}
          />
          <div className="flex flex-row xl:flex-col items-center xl:absolute xl:top-0 xl:mt-16 mb-4 md:mb-6">
            <EnduranceGauge />
            <BonusList className="flex flex-row xl:flex-col" />
          </div>
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
