<<<<<<< HEAD
import { Role } from 'types/role';
=======
import { Role } from 'types/Role';
>>>>>>> 3a793cfcc3dafc0fbfb19fb9c5bdd6f015f91b01
import { getTokenData } from './token';

export const isAuthenticated = (): boolean => {
  let tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

export const hasAnyRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    return true;
  }

  const tokenData = getTokenData();

  if (tokenData !== undefined) {
    for (var i = 0; i < roles.length; i++) {
      if (tokenData.authorities.includes(roles[i])) {
        return true;
      }
    }
    //return roles.some(role => tokenData.authorities.includes(role));
  }

  return false;
};
