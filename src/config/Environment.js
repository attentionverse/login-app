import Constants from "expo-constants"

const ENV = {
    dev: {
        apiUrl: "http://192.168.29.148:9000/api/v1/",
        amplitudeKey:"",
        androidClientId:"18394085791-p9bq4luc808bdlkv8i9ven498or0upn1.apps.googleusercontent.com",
        iosClientId:"",
        facebookAppId: " "
    },
    prod:{
        apiUrl: "",
        amplitudeKey:"",
        androidClientId:"",
        iosClientId:"",
        facebookAppId: " "
    }
}

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    if(__DEV__){
        return ENV.dev;
    } else if (env === "prod"){
        return ENV.prod;
    }
}

export default getEnvVars;