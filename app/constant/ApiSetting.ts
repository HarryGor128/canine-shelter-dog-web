import { AxiosRequestConfig } from 'axios';

const apiURL = 'http://localhost:3003/';

const axiosSetting: AxiosRequestConfig = {
    baseURL: apiURL,
    timeout: 5000,
    data: undefined,
};

const ApiSetting = { axiosSetting };

export default ApiSetting;
