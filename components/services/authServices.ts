import axios from 'axios';
import LoginInfo from '../type/LoginInfo';
import RegistrationInfo from '../type/RegistrationInfo';
import ApiEndpoint from '../constant/ApiEndpoint';
import { setUser } from '../store/reducer/userSlice';
import { store } from '../store/store';
import { setIsLogin } from '../store/reducer/appStateSlice';

const authServices = {
    async login(loginInfo: LoginInfo): Promise<APIResult> {
        try {
            const result = await axios.post(ApiEndpoint.auth.Login, loginInfo);
            console.log(
                '🚀 ~ file: authServices.ts:10 ~ login ~ result:',
                result,
            );

            const data = result.data;
            if (data === undefined) {
                return Promise.resolve({
                    result: false,
                    msg: result.response.data,
                });
            }
            store.dispatch(setUser(data));
            store.dispatch(setIsLogin(true));

            return Promise.resolve({ result: true, msg: '' });
        } catch (error) {
            console.log(
                '🚀 ~ file: authServices.ts:14 ~ login ~ error:',
                error,
            );
            return Promise.resolve({ result: false, msg: error as string });
        }
    },

    async registration(registrationInfo: RegistrationInfo): Promise<APIResult> {
        try {
            const result = await axios.post(
                ApiEndpoint.auth.registration,
                registrationInfo,
            );
            console.log(
                '🚀 ~ file: authServices.ts:44 ~ registration ~ result:',
                result,
            );

            const data = result.data;
            if (data === undefined) {
                return Promise.resolve({
                    result: false,
                    msg: result.response.data,
                });
            }

            store.dispatch(setUser(data));
            store.dispatch(setIsLogin(true));

            return Promise.resolve({ result: true, msg: '' });
        } catch (error) {
            console.log(
                '🚀 ~ file: authServices.ts:48 ~ registration ~ error:',
                error,
            );
            return Promise.resolve({ result: false, msg: error as string });
        }
    },
};

export default authServices;
