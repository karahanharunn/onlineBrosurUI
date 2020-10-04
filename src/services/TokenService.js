import AsyncStorage from "@react-native-community/async-storage";

let token;
export const tokenService = {
  get,
  set,
};
async function get() {
  if (token) return token;
  token = await AsyncStorage.getItem('userToken');
  return token;
}
async function set(value) {
  token = value;
}
