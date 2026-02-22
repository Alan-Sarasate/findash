export interface Category {
    id: string,
    name: string,
    created_at: EpochTimeStamp,
    type: 'income' | 'expense'
}

export interface ICategoryPayload {
    name: string,
    type: string
}