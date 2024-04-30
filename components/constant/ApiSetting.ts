import { AxiosRequestConfig } from 'axios';

// const apiURL = 'https://canine-shelter-dog-api.zeabur.app/'; // zeabur
const apiURL = 'http://192.168.1.8:8000/'; // Home Local Lan IP
// const apiURL = 'http://192.168.10.56:8000/'; // Office Local Lan IP
// const apiURL = 'http://localhost:8000/'; // localhost

const axiosSetting: AxiosRequestConfig = {
    baseURL: apiURL,
    timeout: 5000,
    responseType: 'json',
    data: undefined,
};

const ApiSetting = { axiosSetting };

export default ApiSetting;
