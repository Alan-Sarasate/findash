interface ExcludeCategorySectionProps {
    categoryName: string,
    deleteFunction: () => void
    cancelFunction: () => void
}

export const ExcludeCategorySection = ({ categoryName, deleteFunction, cancelFunction}:ExcludeCategorySectionProps) => {
    return (
        <div>
            <h3>Tem certeza que deseja excluir a categoria {`${categoryName || "Categoria não encontrada"}?`}</h3>
            <div>
                <button onClick={cancelFunction}>Cancelar</button>
                <button onClick={deleteFunction}>Confirmar</button>
            </div>
        </div>
    )
}