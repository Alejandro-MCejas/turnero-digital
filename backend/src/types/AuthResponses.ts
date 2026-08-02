export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface LogoutResponse {
    message: string;
}