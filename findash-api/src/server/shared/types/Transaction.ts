export interface Transaction {
    id: string,
    created_at: EpochTimeStamp,
    amount: number,
    description: string,
    type: 'income' | 'expense',
    date: Date,
    category_id: string,
}