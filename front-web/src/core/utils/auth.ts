import jwtDecode from 'jwt-decode';
import history from './history';
export const CLIENT_ID = 'dscatalog'
export const CLIENT_SECRET = 'dscatalog123'

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: number;
  userFirstName: string;
  userId: number;
}

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

type AcessToken = {
  exp: number;
  user_name: string;
  authorities: Role[];

}

export const saveSessionData = (loginResponse: LoginResponse) => {
  localStorage.setItem('authData', JSON.stringify(loginResponse))
}

export const getSessionData = () => {
  const sessionData = localStorage.getItem('authData') ?? '{}';
  const parsedSessionData = JSON.parse(sessionData);

  return parsedSessionData as LoginResponse;
}

export const getAccessTokenDecoded = () => {
  const sessionData = getSessionData();

  try {       
    const tokenDecoded = jwtDecode(sessionData.access_token);
    return tokenDecoded as AcessToken;
  } catch (error) {
    return {} as AcessToken;
  }
}

export const isTokenValid = () => {
  const { exp } = getAccessTokenDecoded();

  return Date.now() <= exp * 1000    
}

export const isAuthenticated = () => {
  const sessionData = getSessionData();

  return sessionData.access_token && isTokenValid();
} 

export const isAllowedByRole = (routeRole: Role[] = []) => {
  if (routeRole.length === 0) {
    return true;
  }

  const { authorities } = getAccessTokenDecoded();
  return routeRole.some(role => authorities?.includes(role));
}

export const logout = () => {
  localStorage.removeItem('authData');
  history.replace('/auth/login');
}