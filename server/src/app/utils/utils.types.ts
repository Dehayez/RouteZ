// Setting some standards for erros
export interface IError extends Error {
    // Optional
    details?: string;
    // Required
    status: number;
    timestamp: number;
};