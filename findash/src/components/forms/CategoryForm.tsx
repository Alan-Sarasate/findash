import { useForm } from "react-hook-form"
import type { ICategoryPayload } from "../../types"
import { API_BASE_URL } from "../../config/api"

interface ICategoryFormProps {
    type?: 'create' | 'update'
    categoryId?: string
    defaultValues?: ICategoryPayload
    onCancel: () => void
    onSuccess: () => void
}

interface IUpdateCategoryPayload {
    categoryId: string,
    data: ICategoryPayload
}

export const CategoryForm = ({ type = 'create', categoryId, defaultValues, onCancel, onSuccess }:ICategoryFormProps) => {
    
    const { register, handleSubmit, reset, formState: { errors }} = useForm<ICategoryPayload>({
        defaultValues
    });

    const createCategory = async (data: ICategoryPayload) => {
        try{
            const url = `${API_BASE_URL}/categories`

            const response =  await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(!response.ok) throw new Error(`Erro: ${response?.status}`)
            
            const newCategory = await response.json()
            console.log("Nova categoria: ", newCategory)

            reset()
            onSuccess()
        }catch(error) {
            alert(error)
        }
    }

    const updateCategory = async ({ categoryId, data }:IUpdateCategoryPayload) => {
        try{
            const url = `${API_BASE_URL}/categories/${categoryId}`

            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json"
                }
            })

            if(!response.ok) throw new Error(`Erro: ${response?.status}`)

            const editCategory = await response.json()
            console.log("Categoria editada: ", editCategory)

            reset()
            onSuccess()
        }catch(error){
            alert(error)
            console.log(error)
        }
    }

    const onSubmit = (categoryData: ICategoryPayload) => {
        if(type === 'update'){
            if(!categoryId) {
                alert("Id da categoria é obrigatório.")
                return
            }

            updateCategory({categoryId: categoryId, data: categoryData})
            return
        }

        createCategory(categoryData);
    }


    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <h3>{type === 'create' ? "Criar categoria" : `Editar categoria - ${defaultValues?.name || "Categoria não encontrada"}`}</h3>
            <div>
                <span id="name">Nome da categoria: </span>
                <input id="name" placeholder="Nome da categoria" {...register("name", {required: "O nome da categoria é obrigatório.", min: 3})} />
                {errors.name && <span>{errors?.name?.message}</span>}
            </div>
            <div>
                <span id="type">Tipo de categoria: </span>
                <select id="type" {...register("type", {value: "expense", required: "O tipo da categoria é obrigatório."})}>
                    <option value="income">Entrada</option>
                    <option value="expense" defaultChecked>Saída</option>
                </select>
                {errors?.type && <span>{errors?.type?.message}</span>}
            </div>
            <button onClick={onCancel} type="button">Cancelar</button>
            <button type="submit">Salvar</button>
        </form>
    )
}