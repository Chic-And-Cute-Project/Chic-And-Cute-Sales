import {User} from "../user";

export interface UserApiResponse {
  token: string;
  user: User;
  users: Array<User>;
}
