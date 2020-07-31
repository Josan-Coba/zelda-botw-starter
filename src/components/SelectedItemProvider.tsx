import React from 'react'

type SelectItem = (index: number | undefined) => void

const SelectedItemStateContext = React.createContext<number | undefined>(
  undefined,
)

const SelectedItemDispatchContext = React.createContext<SelectItem>(() => () =>
  undefined,
)

export const SelectedItemProvider: React.FC = ({ children }) => {
  const [selectedItem, setSelectedItem] = React.useState<number | undefined>(
    undefined,
  )

  return (
    <SelectedItemStateContext.Provider value={selectedItem}>
      <SelectedItemDispatchContext.Provider value={setSelectedItem}>
        {children}
      </SelectedItemDispatchContext.Provider>
    </SelectedItemStateContext.Provider>
  )
}

export function useSelectedItem(): [number | undefined, SelectItem] {
  const selectedItem = React.useContext(SelectedItemStateContext)
  const selectItem = React.useContext(SelectedItemDispatchContext)

  return [selectedItem, selectItem]
}
