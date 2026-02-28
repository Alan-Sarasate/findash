export interface TransactionParams {
    id?: number
}

export interface TransactionPayload {
    type: 'income' | 'expense',
    description?: string | null,
    amount: number,
    date: Date,
    categoryId: string
}