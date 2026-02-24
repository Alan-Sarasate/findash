import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import type { Category } from "../../../types/Category"
import { ExcludeCategorySection } from "../../../components/excludeCategorySection"
import { API_BASE_URL } from "../../../config/api"

export const CategoryPage = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const CATEGORY_TYPES_MAPPING = {
        'expense': "Saída",
        'income': "Entrada"
    }

    type PageParams = {
        categoryId: string
    }

    const { categoryId } = useParams<PageParams>()
    const [category, setCategory] = useState<Category | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const getCategoryById = async (categorieId:string) => {

            const url = `${API_BASE_URL}/categories/${categorieId}`
            console.log("url: ",url)

            const response = await fetch(url)
            const data = await response.json()
            setCategory(data)
        }

        if(!categoryId) return

        getCategoryById(categoryId)
    }, [categoryId])

    const openSectionExcludeCategory = () => setIsOpen(true)

    const closeSectionExcludeCategory = () => setIsOpen(false)

    const handleDeleteCategory = async (categoryId:string) => {
        if(!categoryId) {
            closeSectionExcludeCategory()
            return
        }
        const url = `${API_BASE_URL}/categories/${categoryId}`
        const response = await fetch(url, {
            method: "DELETE"
        }).then(() => {
            navigate('/categories')
            alert("Categoria excluída com sucesso")
        }).catch(erro => {
            alert(erro)
        })
        console.log("Response: ", response)
    }

    const handleBackNavigation = () => {
        const page = location?.state?.page
        if(page) {
            navigate(`/categories?page=${page}`)
            return
        }

        navigate('/categories')
    }

    return (
        <div>
            <button onClick={handleBackNavigation}>Voltar</button>
            <button onClick={() => openSectionExcludeCategory()}>Excluir categoria</button>
            <div>
                <h1>Detalhes da categoria: {`#${category?.id || 0} - ${category?.name || "Categoria não encontrada"}`}</h1>
                <h3>Nome: {`${category?.name || "Categoria não encontrada"}`}</h3>
                <h3>Tipo: {`${category ? CATEGORY_TYPES_MAPPING[category?.type] : "Categoria não encontrada"}`}</h3>
                <h3>Data e hora de criação: {`${category?.created_at}`}</h3>
            </div>
            <div>{"Aqui" + isOpen}</div>

            {isOpen && <>
                <ExcludeCategorySection 
                    categoryName={category?.name || "Categoria não encontrada"}
                    cancelFunction={() => closeSectionExcludeCategory()}
                    deleteFunction={() => {
                        if(!categoryId) return
                        handleDeleteCategory(categoryId)
                    }}/>
            </>}        
        </div>
    )
}