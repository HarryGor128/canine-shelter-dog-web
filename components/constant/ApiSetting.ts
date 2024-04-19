import { AxiosRequestConfig } from 'axios';

// const apiURL = 'https://canine-shelter-dog-api.zeabur.app/'; // zeabur
const apiURL = 'http://192.168.1.6:8000/'; // Local Lan IP

const axiosSetting: AxiosRequestConfig = {
    baseURL: apiURL,
    timeout: 5000,
    responseType: 'json',
    data: undefined,
};

const ApiSetting = { axiosSetting };

export default ApiSetting;
