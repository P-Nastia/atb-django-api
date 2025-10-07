export interface Index {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface ILoginResponse {
    refresh: string;
    access: string;
}