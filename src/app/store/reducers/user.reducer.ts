import {dedent} from 'tslint/lib/utils';


const initialState = {
  users: [
    {
      uid: "2gf",
      name:"John Dow",
      DOB: new Date(),
      position: "admin"
    },
    {
      uid: "2gfgdsww",
      name:"Var Clif",
      DOB: new Date(),
      position: "None"
    },
    {
      uid: "45dsfdfsd",
      name:"Raf Born",
      DOB: new Date(),
      position: "Boss"
    }
  ],
  loading: false,
  loaded: true
}


export function UserReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_USER": {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    default: {
      return state;
    }
  }
}
