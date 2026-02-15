import './App.css'
import { Route, Routes } from 'react-router-dom'
import { CategoriesPage } from './pages/Categories/Categories'
import { CategoryPage } from './pages/Categories/[id]/page'

function App() {

  
  return (
    <>
      <Routes>
        <Route path='/categories' element={<CategoriesPage/>}/>
        <Route path='/categories/:categoryId' element={<CategoryPage/>}/>
      </Routes>
    </>
  )
}

export default App
