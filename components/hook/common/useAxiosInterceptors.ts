'use client';
import axios, { AxiosError } from 'axios';

import ApiSetting from '../../constant/ApiSetting';
import { closeLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

const useAxiosInterceptors = () => {
    const dispatch = useAppDispatch();

    axios.create(ApiSetting.axiosSetting);

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: AxiosError) => {
            dispatch(closeLoader());
            return Promise.resolve(error);
        },
    );
};

export default useAxiosInterceptors;
