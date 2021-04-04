import {Auth} from 'aws-amplify';
import LocalStorageService from './LocalStorageService';

export const KEY_USER_NAME = '#UserName:';
export const KEY_AUTH_USER = '#AuthUser:';

export default class authService {
  static setUserName(userData) {
    LocalStorageService.setItem(KEY_USER_NAME, JSON.stringify(userData));
  }

  static getUserName() {
    return LocalStorageService.getItem(KEY_USER_NAME);
  }

  static setAuthUser(authUser) {
    LocalStorageService.setItem(KEY_AUTH_USER, JSON.stringify(authUser));
  }

  static getAuthUser(authUser) {
    return LocalStorageService.getItem(KEY_AUTH_USER).then((json) =>
      JSON.parse(json),
    );
  }

  static async logOut() {
    await Auth.signOut({global: true});
    LocalStorageService.removeItem(KEY_AUTH_USER);
  }
}
