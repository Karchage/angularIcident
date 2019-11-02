export interface UserInterface {
  uid: string;
  fName: string;
  lName: string;
  DOB: Date;
  Position: string;
  admin?: boolean;
  loading?: boolean;
  error?: string;
}

export class User {
  constructor(
              public uid: string,
              public fName: string,
              public lName: string,
              public DOB: Date,
              public Position: string,
              public admin?: boolean,
              public loading?: boolean,
              public error?: string, ) {}
}
