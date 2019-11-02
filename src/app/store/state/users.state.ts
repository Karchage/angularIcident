
import {UserInterface} from '../../interfaces/user.interface';

export interface  IUserInterface {
  users: UserInterface[];
  selectedUser: UserInterface;
}

export const initialUserState: IUserInterface = {
  users: null,
  selectedUser: null
}
