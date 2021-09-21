<<<<<<< HEAD
import jwtDecode from 'jwt-decode';
import { Role } from 'types/role';
import { getAuthData } from './storage';
=======
import jwtDecode from "jwt-decode";
import { Role } from "types/Role";
import { getAuthData } from "./storage";
>>>>>>> 3a793cfcc3dafc0fbfb19fb9c5bdd6f015f91b01

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

export const getTokenData = (): TokenData | undefined => {
  try {
    return jwtDecode(getAuthData().access_token) as TokenData;
  } catch (error) {
    return undefined;
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 3a793cfcc3dafc0fbfb19fb9c5bdd6f015f91b01
