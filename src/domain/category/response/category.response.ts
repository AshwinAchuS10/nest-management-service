export interface ICategoryResponse {
    status: number;
    message: string;
    category: any | null;
    errors: { [key: string]: any } | null;
}