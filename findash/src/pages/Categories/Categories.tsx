import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import type { Category, ICategoryPayload } from "../../types/Category"
import { ExcludeCategorySection } from "../../components/excludeCategorySection"
import { CategoryForm } from "../../components/forms/CategoryForm"
import { API_BASE_URL } from "../../config/api"

export const CategoriesPage = () => {
  
  const navigate = useNavigate()

  const [categories, setCategories] = useState<Category[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [refetch, setRefetch] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<Category|null>(null)
  const [formKey, setFormKey] = useState<string | null>(null)

  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false)
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined)
  const [categoryFormOperation, setCategoryFormOperation] = useState<'create' | 'update'>('create')
  const [categoryFormDefaultValues, setCategoryFormDefaultValues] = useState<ICategoryPayload | undefined>(undefined)

  const [searchParams, setSearchParams] = useSearchParams({page: "1"})
  const [maxPage, setMaxPage] = useState(1)

  interface IGetAllResponse {
    totalItems: number,
    totalPages: number, 
    page: number,
    data: Category[]
}

  useEffect(() => {
    const getAllCategories = async () => {
      try{
        const page = searchParams.get('page') || 1
        const response = await fetch(`${API_BASE_URL}/categories?page=${page}`)
        console.log("RESPONSE: ", response)
        const data:IGetAllResponse = await response.json()
        setCategories(data?.data || [])
        setMaxPage(data?.totalPages ?? 1)
      } catch(err) {
        console.log("O erro:", err)
      }
    }

    getAllCategories()
  },[searchParams, refetch])

  const nextPageHandleClick = () => {
    const page = Number(searchParams.get('page')) || 1
    if(page >= maxPage) return
    setSearchParams({page: String(page + 1)})
  }

  const previousPageHandleClick = () => {
    const page = Number(searchParams.get('page')) || 1
    if(page <= 1) return
    setSearchParams({page: String(Number(page) - 1)})
  }

  const handleViewCategorieDetails = (id:string) => {
    navigate(`/categories/${id}`, {state: {
      page: searchParams.get('page')
    }})
  }

  const openExcludeCategorySection = (selectedCategory:Category) => {
    setSelectedCategory(selectedCategory)
    closeCategoryFormSection()
    setIsOpen(true)
  }

  const closeExcludeCategorySection = () => {
    setSelectedCategory(null)
    setIsOpen(false)
  }

  const handleDeleteCategory = async (categoryId:string) => {
        if(!categoryId) {
            closeExcludeCategorySection()
            return
        }

        const url = `${API_BASE_URL}/categories/${categoryId}`

        try{
          await fetch(url, {
            method: "DELETE"
          })
          alert("Categoria excluída com sucesso")
          const page = Number(searchParams.get('page') || 1)
          if(categories.length === 1 && page > 1) setSearchParams({page: String(page - 1)}) 
          closeExcludeCategorySection()
          setRefetch(refetch => refetch+1)
        }catch(err){
          alert(err)
        }
  }

  const openCategoryFormSection = (operationType: 'create' | 'update' = 'create', categoryId?: string, defaultValues?: ICategoryPayload) => {
    closeExcludeCategorySection()
    setCategoryFormOperation(operationType)
    setCategoryId(categoryId)
    setCategoryFormDefaultValues(defaultValues)
    setFormKey(operationType === 'create' ? String(Date.now()) : (categoryId || String(Date.now())))
    setIsCategoryFormOpen(true)
  }

  const closeCategoryFormSection = () => setIsCategoryFormOpen(false)

  const onSuccessFormCategory = () => {
    if(categoryFormOperation === 'create') setSearchParams({page: '1'})
    setRefetch(refetch => refetch+1)
    closeCategoryFormSection()
    alert(`Categoria ${categoryFormOperation === "create" ? "criada" : "editada"} com sucesso`);
  }

  return (
      <>
        <div>
          <button onClick={() => openCategoryFormSection()}>Criar categoria</button>
        </div>
        <div>
          {categories.map((category, index) => 
              <div key={category?.id}>
                <span>{`${category?.id || index} - ${category?.name || "Categoria"}`}</span>
                <>
                  <button onClick={() => handleViewCategorieDetails(category?.id)}>Visualizar</button>
                  <button onClick={() => openCategoryFormSection('update', category?.id, {name: category?.name, type: category?.type})}>Editar</button>
                  <button onClick={() => openExcludeCategorySection(category)}>Excluir</button>
                </>
          </div>)}
          <div>
            <button onClick={previousPageHandleClick}>Anterior</button>
            <span>{searchParams.get('page')}</span>
            <button onClick={nextPageHandleClick}>Próximo</button>
          </div>

          {isCategoryFormOpen && 
            <CategoryForm
              key={formKey}
              type={categoryFormOperation} 
              onSuccess={onSuccessFormCategory} 
              onCancel={closeCategoryFormSection}
              defaultValues={categoryFormDefaultValues}
              categoryId={categoryId}/>}

          {isOpen && <>
            <ExcludeCategorySection
              categoryName={selectedCategory?.name || "Categoria não encontrada"}
              cancelFunction={() => closeExcludeCategorySection()}
              deleteFunction={() => {
                  if(!selectedCategory) return
                  handleDeleteCategory(selectedCategory?.id)
              }}/>
          </>}    
        </div>
      </>
  )
}