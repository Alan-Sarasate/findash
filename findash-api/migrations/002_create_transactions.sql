CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    description VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    type VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    category_id UUID NOT NULL REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT NOW()
);