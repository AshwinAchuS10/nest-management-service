export interface IUserCreateResponse {
  status: number;
  message: string;
  user: any | null;
  errors: { [key: string]: any } | null;
}
