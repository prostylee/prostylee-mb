import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_USER_DATA = '@userData';
const KEY_DEVICE_INFO = '@deviceInfo';
const KEY_USER_TOKEN = '@userToken';

export default class LocalDB {
  static async setUserToken(userToken) {
    await AsyncStorage.setItem(KEY_USER_TOKEN, JSON.stringify(userToken));
  }

  static async getUserToken() {
    return AsyncStorage.getItem(KEY_USER_TOKEN).then((json) => {
      return JSON.parse(json);
    });
  }

  static async setUserData(userData) {
    await AsyncStorage.setItem(KEY_USER_DATA, JSON.stringify(userData));
  }

  static async getUserData() {
    return AsyncStorage.getItem(KEY_USER_DATA).then((json) => JSON.parse(json));
  }

  static async logOut() {
    await AsyncStorage.multiRemove([KEY_USER_DATA, KEY_USER_TOKEN]);
  }

  static async setDeviceInfo(data) {
    await AsyncStorage.setItem(KEY_DEVICE_INFO, JSON.stringify(data));
  }

  static async getDeviceInfo() {
    return AsyncStorage.getItem(KEY_DEVICE_INFO).then((json) =>
      JSON.parse(json),
    );
  }
}
