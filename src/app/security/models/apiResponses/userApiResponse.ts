import {User} from "../user";

export interface UserApiResponse {
  token: string;
  role: string;
  user: User;
  users: Array<User>;
}
