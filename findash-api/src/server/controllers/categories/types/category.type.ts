export interface CategoryParams {
    id?: number
}

export interface CategoryPayload {
    name: string
    type: 'income' | 'expense'
}