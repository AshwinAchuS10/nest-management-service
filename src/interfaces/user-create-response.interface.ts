import { User } from 'src/entities/user.entity';

export interface IUserCreateResponse {
  status: number;
  message: string;
  user: User | null;
  errors: { [key: string]: any } | null;
}
