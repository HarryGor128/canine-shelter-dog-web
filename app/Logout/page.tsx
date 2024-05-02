'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch } from '../../components/store/storeHooks';
import { setUser } from '../../components/store/reducer/userSlice';
import UserInfo from '../../components/type/UserInfo';
import { setIsLogin } from '../../components/store/reducer/appStateSlice';
import { useCookies } from 'next-client-cookies';
import CookieKey from '../../components/constant/CookieKey';

const Logout = () => {
    const router = useRouter();

    const cookies = useCookies();

    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(setUser(new UserInfo()));
        dispatch(setIsLogin(false));

        cookies.remove(CookieKey.LoginInfo);
        cookies.remove(CookieKey.UserRole);

        router.replace('/Home');
    };

    useEffect(() => {
        logout();
    }, []);

    return <></>;
};

export default Logout;
