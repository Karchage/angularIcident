export interface RegInterface {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface RegResponseInterface {
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
}
