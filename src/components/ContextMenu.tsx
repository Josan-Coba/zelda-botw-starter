import classnames from 'classnames'
import React, { useCallback, useState, useMemo } from 'react'
import TriangleBox from './TriangleBox'
import useClickOutside from '../hooks/useClickOutside'
import { useAppDispatch } from '../store'
import {
  equipSelectedItem,
  dropSelectedItem,
  closeItemContextMenu,
} from '../store/actions'
import { usePlayAction, usePlaySelect } from '../hooks/sound'

export enum ContextMenuOption {
  Equip = 'equip',
  Drop = 'drop',
  Close = 'close',
}

interface ContextMenuProps {
  onClose?: () => void
}

const options = [
  ContextMenuOption.Equip,
  ContextMenuOption.Drop,
  ContextMenuOption.Close,
]

const ContextMenu: React.FC<ContextMenuProps> = ({ onClose }) => {
  const playAction = usePlayAction()
  const playSelect = usePlaySelect()
  const dispatch = useAppDispatch()
  const equip = useCallback(() => {
    dispatch(equipSelectedItem())
    onClose?.()
  }, [dispatch, onClose])
  const drop = useCallback(() => {
    dispatch(dropSelectedItem())
    onClose?.()
  }, [dispatch, onClose])
  const close = useCallback(() => {
    dispatch(closeItemContextMenu())
    onClose?.()
  }, [dispatch, onClose])

  const contextMenuRef = useClickOutside<HTMLDivElement>(close)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const actions = useMemo(() => {
    return options.map(actionHandler)

    function actionHandler(action: ContextMenuOption) {
      return (event?: React.MouseEvent) => {
        setSelectedIndex(options.indexOf(action))
        event?.stopPropagation()
        event?.preventDefault()
        switch (action) {
          case ContextMenuOption.Close:
            close()
            break
          case ContextMenuOption.Drop:
            playAction()
            drop()
            break
          case ContextMenuOption.Equip:
            playAction()
            equip()
            break
        }
      }
    }
  }, [close, drop, equip, playAction])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      event.stopPropagation()
      switch (event.key) {
        case 'ArrowUp':
          playSelect()
          setSelectedIndex((oldIndex) =>
            oldIndex > 0 ? oldIndex - 1 : oldIndex,
          )
          break
        case 'ArrowDown':
          playSelect()
          setSelectedIndex((oldIndex) =>
            oldIndex < options.length - 1 ? oldIndex + 1 : oldIndex,
          )
          break
        case 'Enter':
          actions[selectedIndex]()
          break
        case 'Escape':
          close()
          break
      }
    },
    [actions, close, selectedIndex, playSelect],
  )

  return (
    <div
      className={classnames(
        'absolute flex flex-col z-40 top-0 left-0 mx-6 my-6 py-2 w-32',
        'border border-zelda-darkGray bg-zelda-bgModal',
        'text-white outline-none',
      )}
      onKeyDown={handleKeyDown}
      ref={contextMenuRef}
      tabIndex={-1}
    >
      {options.map((currentOption, index) => {
        const isSelected = currentOption === options[selectedIndex]
        return (
          <button
            autoFocus={isSelected}
            className={classnames(
              'relative px-6 py-2 my-2 mx-4 capitalize focus:outline-none',
              {
                'border border-zelda-softYellow shadow-yellow': isSelected,
                'border border-zelda-darkGray': !isSelected,
              },
            )}
            key={currentOption}
            onClick={actions[index]}
            type="button"
          >
            {currentOption}
            {isSelected && <TriangleBox />}
          </button>
        )
      })}
    </div>
  )
}

export default ContextMenu
