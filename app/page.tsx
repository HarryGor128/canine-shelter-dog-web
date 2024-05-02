'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import CookieKey from '../components/constant/CookieKey';
import { useAppDispatch } from '../components/store/storeHooks';
import { useCookies } from 'next-client-cookies';
import { setIsStaff } from '../components/store/reducer/userSlice';
import authServices from '../components/services/authServices';

const main = () => {
    const dispatch = useAppDispatch();

    const cookies = useCookies();

    const getLoginInfo = async () => {
        const loginInfo = cookies.get(CookieKey.LoginInfo);

        if (loginInfo) {
            const result = await authServices.login(JSON.parse(loginInfo));

            if (result) {
                const role = cookies.get(CookieKey.UserRole);
                dispatch(setIsStaff(role ? role.includes('true') : false));
            }
        }
    };

    useEffect(() => {
        getLoginInfo();
        redirect('/Home');
    }, []);

    return <></>;
};

export default main;
