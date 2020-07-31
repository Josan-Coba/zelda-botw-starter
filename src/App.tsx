import React from 'react'
import ItemsGrid from './components/ItemsGrid'
import { SelectedItemProvider } from './components/SelectedItemProvider'

function App() {
  const itemsPerPage = 20

  return (
    <SelectedItemProvider>
      <div className="min-h-screen bg-zelda-darkGreen">
        <div className="container mx-auto flex flex-col xl:flex-row">
          <div className="w-full xl:w-1/2">
            <ItemsGrid itemsPerPage={itemsPerPage} />
          </div>
          <div className="w-full xl:w-1/2 bg-teal-700"></div>
        </div>
      </div>
    </SelectedItemProvider>
  )
}

export default App
