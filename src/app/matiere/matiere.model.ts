import { User } from "../user/user.model";

export class Matiere {
    _id?: string;
    code!: string;
    nom!: string;
    description!: string;
    id_user!: string;
    user?: User;
    image_name!: string;
  }