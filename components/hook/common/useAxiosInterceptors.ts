import { useContext } from 'react';

import axios, { AxiosError } from 'axios';

import AppSnackBarContext from '../../components/common/AppSnackBar/context/AppSnackBarContext';
import ApiEndpoint from '../../constant/ApiEndpoint';
import ApiSetting from '../../constant/ApiSetting';
import { closeLoader } from '../../store/reducer/appStateSlice';
import { useAppDispatch } from '../../store/storeHooks';

const useAxiosInterceptors = () => {
    const { setIsOpen, setMsg, setType } = useContext(AppSnackBarContext);

    const dispatch = useAppDispatch();

    axios.create(ApiSetting.axiosSetting);

    axios.defaults.baseURL = ApiSetting.axiosSetting.baseURL;
    axios.defaults.responseType = 'json';

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: AxiosError) => {
            console.log(
                '🚀 ~ file: useAxiosInterceptors.ts:25 ~ useAxiosInterceptors ~ error:',
                error,
            );
            dispatch(closeLoader());

            if (!error.config?.url?.includes(ApiEndpoint.auth.roleQuery)) {
                setMsg(error.message);
                setType('error');
                setIsOpen(true);
            }

            return Promise.resolve(error);
        },
    );
};

export default useAxiosInterceptors;
