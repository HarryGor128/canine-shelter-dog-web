'use client';

import { useContext, useState } from 'react';

import { Send } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

import AppSnackBarContext from '../../components/components/common/AppSnackBar/context/AppSnackBarContext';
import Button from '../../components/components/common/Button/Button';
import TextFieldInput from '../../components/components/common/TextFieldInput/TextFieldInput';
import authServices from '../../components/services/authServices';
import { setIsStaff } from '../../components/store/reducer/userSlice';
import { useAppDispatch } from '../../components/store/storeHooks';
import LoginInfo from '../../components/type/LoginInfo';

const Login = () => {
    const [loginInfo, setLoginInfo] = useState<LoginInfo>(new LoginInfo());
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const router = useRouter();

    const dispatch = useAppDispatch();

    const { setIsOpen, setMsg, setType } = useContext(AppSnackBarContext);

    const onInput = (text: string, key: keyof LoginInfo) => {
        setLoginInfo((prev) => {
            return { ...prev, [key]: text };
        });
    };

    const onPressLogin = async () => {
        setIsSubmitting(true);

        if (loginInfo.email && loginInfo.password) {
            const result = await authServices.login(loginInfo);
            if (result.result) {
                setMsg('Login Success');
                setType('success');
                setIsOpen(true);

                const getRole = await authServices.roleQuery(loginInfo.email);
                dispatch(setIsStaff(getRole));

                router.back();
            }
        } else {
            setMsg('Please input Email / Password');
            setType('error');
            setIsOpen(true);
        }
    };

    const onPressReg = () => {
        router.replace('/Registration');
    };

    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            minHeight={'100vh'}
        >
            <Stack direction={'column'} spacing={2}>
                <div style={{ alignSelf: 'center' }}>Login</div>
                <TextFieldInput
                    label={'Email'}
                    placeHolder={'Email'}
                    onInputText={(text) => {
                        onInput(text, 'email');
                    }}
                    isRequired
                    error={isSubmitting && !loginInfo.email}
                />
                <TextFieldInput
                    label={'Password'}
                    placeHolder={'Password'}
                    onInputText={(text) => {
                        onInput(text, 'password');
                    }}
                    isRequired
                    isSecret
                    error={isSubmitting && !loginInfo.password}
                />
                <Button
                    onPress={() => {
                        onPressLogin();
                    }}
                    text={'Login'}
                    endIcon={<Send />}
                    disabled={!loginInfo.email || !loginInfo.password}
                />
                <Button
                    onPress={() => {
                        onPressReg();
                    }}
                    text={'Registration'}
                    variant={'text'}
                />
            </Stack>
        </Box>
    );
};

export default Login;
