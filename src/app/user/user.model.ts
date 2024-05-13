export class User {
  _id?: string;
  email!: string;
  name!: string;
  last_name!: string;
  date_of_birth!: Date;
  status!: string;
  rendu!: boolean;
  password!: string;
}