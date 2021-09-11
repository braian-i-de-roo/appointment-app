import AsyncStorage from '@react-native-async-storage/async-storage'

export const save = async (key: string, value: string | Object): Promise<void> => {
  try {
    if (value instanceof Object) {
      const str = JSON.stringify(value);
      return AsyncStorage.setItem(key, str);
    } else {
      return AsyncStorage.setItem(key, value);
    }
  } catch (e) {
    Promise.reject(e);
  }
}

export const get = async (key: string) : Promise<string | Object> => {
  try {
    const aux = await AsyncStorage.getItem(key);
    if (typeof aux === 'string') {
      return aux.replace(/"/g, '');
    } else return aux;
  } catch (e) {
    Promise.reject(e)
  }
}

export const getAll = async (): Promise<any> => {
  try {
    const keys: Array<string> = await AsyncStorage.getAllKeys()
    let res: any = {};
    for (let keyIndex in keys) {
      const key: string = keys[keyIndex];
      res[key] = await AsyncStorage.getItem(key);
    }
    return res;
  } catch (e) {
    Promise.reject(e);
  }
}
