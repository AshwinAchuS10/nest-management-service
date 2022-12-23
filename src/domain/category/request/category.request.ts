export interface CreateCategory {
    name: string;
    description: string;
    status: string;
    tags: Array<string>;
    ownerId: string;
}