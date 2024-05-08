import { AxiosRequestConfig } from 'axios';

const apiURL = 'https://canine-shelter-dog-api.zeabur.app/'; // zeabur
// const apiURL = 'http://192.168.1.8:8000/'; // Home Local Lan IP
// const apiURL = 'http://192.168.10.56:8000/'; // Office Local Lan IP
// const apiURL = 'http://localhost:8000/'; // localhost

// const wsURL = 'ws://canine-shelter-dog-api.zeabur.app:10000/' // zeabur websocket
const wsURL = 'ws://192.168.10.56:10000/'; // Office Local Lan websocket
// const wsURL = 'ws://localhost:10000/'; // localhost websocket

const axiosSetting: AxiosRequestConfig = {
    baseURL: apiURL,
    timeout: 5000,
    responseType: 'json',
    data: undefined,
};

const ApiSetting = { axiosSetting, wsURL, apiURL };

export default ApiSetting;
