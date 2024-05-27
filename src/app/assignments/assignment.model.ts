import { Matiere } from "../matiere/matiere.model";
import { User } from "../user/user.model";

export class Assignment {
  _id?: string;
  nom!: string;
  dateDeRendu!: Date;
  rendu!: boolean;
  id_user!: string;
  user?: User;
  id_matiere!: string;
  matiere?: Matiere;
  note?:number;
  remarque?: string;

}
