import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Category } from "../../types/Category"
import { ExcludeCategorySection } from "../../components/excludeCategorySection"

export const CategoriesPage = () => {
  
  const navigate = useNavigate()

  const [categories, setCategories] = useState<Category[]>([])
  const [page, setPage] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [refetch, setRefetch] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<Category|null>(null)

  useEffect(() => {
    const getAllCategories = async () => {
      try{
        console.log(1)
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+`/categories?page=${page}`)
        console.log(2)
        const data = await response.json()
        setCategories(data)
        console.log("Os dados: ",data)
      } catch(err) {
        console.log("O erro:", err)
      }
    }

    getAllCategories()
  },[page, refetch])

  const nextPageHandleClickPage = () => {
    setPage(page => page + 1)
  }

  const previousPageHancleClick = () => {
    if(page <= 1) return
    setPage(page => page - 1)
  }

  const handleViewCategorieDetails = (id:string) => {
    navigate(`/categories/${id}`)
  }

  const openSectionExcludeCategory = (selectedCategory:Category) => {
    setSelectedCategory(selectedCategory)
    setIsOpen(true)
  }

  const closeSectionExcludeCategory = () => {
    setSelectedCategory(null)
    setIsOpen(false)
  }

  const handleDeleteCategory = async (categoryId:string) => {
        if(!categoryId) {
            closeSectionExcludeCategory()
            return
        }
        const url = `${import.meta.env.VITE_BACKEND_URL}/categories/${categoryId}`
        const response = await fetch(url, {
            method: "DELETE"
        }).then(() => {
            alert("Categoria excluída com sucesso")
            closeSectionExcludeCategory()
            setRefetch(refetch => refetch+1)
        }).catch(erro => {
            alert(erro)
        })
        console.log("Response: ", response)
    }

  return (
      <>
          <div>
              {categories.map((category, index) => 
                  <div key={category?.id}>
                      <span>{`${category?.id || index} - ${category?.name || "Categoria"}`}</span>
                      <>
                        <button onClick={() => handleViewCategorieDetails(category?.id)}>Visualizar</button>
                        <button onClick={() => openSectionExcludeCategory(category)}>Excluir</button>
                      </>
                  </div>)}
              <div>
                  <button onClick={previousPageHancleClick}>Anterior</button>
                  <span>{page}</span>
                  <button onClick={nextPageHandleClickPage}>Próximo</button>
              </div>


              {isOpen && <>
                  <ExcludeCategorySection 
                      categoryName={selectedCategory?.name || "Categoria não encontrada"}
                      cancelFunction={() => closeSectionExcludeCategory()}
                      deleteFunction={() => {
                          if(!selectedCategory) return
                          handleDeleteCategory(selectedCategory?.id)
                      }}/>
              </>}    
          </div>
      </>
  )
}