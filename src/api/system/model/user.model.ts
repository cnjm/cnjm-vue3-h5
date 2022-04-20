export interface LoginParams {
  account: string;
  password: string;
}

export interface LoginResult {
  userId: string | number;
  token: string;
}
