import { IRoles } from "./i-roles";

export interface iUser {
  id:number,
  firstName:string,
  lastName: string,
  username: string,
  email:string
  password:string
  roles:IRoles[];
}
