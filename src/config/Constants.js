import getEnvVars from "./Environment";

const {
    apiUrl, androidClientId
} = getEnvVars();

export const BASE_URL = apiUrl;
export const ANDROID_DEV = androidClientId;