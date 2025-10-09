export interface IUserItem {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    image_large:string;
    image_medium:string;
    image_small:string;
}

export interface ILoginResponse {
    refresh: string;
    access: string;
}

export interface IResetPasswordRequest {
    email: string;
}

export interface IResetPasswordConfirm {
    uid: string;
    token: string;
    new_password: string;
    confirm_password: string;
}

export interface ILoginRequest {
    username: string;
    password: string;
}