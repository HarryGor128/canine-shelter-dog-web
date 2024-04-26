'use client';
import { useContext, useState } from 'react';
import LoginInfo from '../../components/type/LoginInfo';
import { Box, Stack } from '@mui/material';
import TextInput from '../../components/components/common/TextInput/TextInput';
import useWindowSize from '../../components/hook/common/useWindowSize';
import Button from '../../components/components/common/Button/Button';
import { Send } from '@mui/icons-material';
import authServices from '../../components/services/authServices';
import AppSnackBarContext from '../../components/components/common/AppSnackBar/context/AppSnackBarContext';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [loginInfo, setLoginInfo] = useState<LoginInfo>(new LoginInfo());
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();

    const { setIsOpen, setMsg, setType } = useContext(AppSnackBarContext);

    const { width, height } = useWindowSize();

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
                router.back();
            } else {
                setMsg(result.msg);
                setType('error');
                setIsOpen(true);
            }
        } else {
            setMsg('Error');
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
                <TextInput
                    label={'Email'}
                    placeHolder={'Email'}
                    onInput={(text) => {
                        onInput(text, 'email');
                    }}
                    isRequired
                    error={isSubmitting && !loginInfo.email}
                />
                <TextInput
                    label={'Password'}
                    placeHolder={'Password'}
                    onInput={(text) => {
                        onInput(text, 'password');
                    }}
                    isRequired
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
