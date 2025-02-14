export interface IUser {
  id: number;
  login: string;
  name: string;
}

export interface IAuthResponse {
    authenticated: boolean;
      message: string;
      login: string;
      name: string;
  }