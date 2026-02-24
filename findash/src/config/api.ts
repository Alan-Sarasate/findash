export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

if(!API_BASE_URL) throw new Error("Url da API não encontrada.")