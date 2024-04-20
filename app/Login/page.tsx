'use client';
import { useState } from 'react';
import LoginInfo from '../../components/type/LoginInfo';
import { Box } from '@mui/material';
import TextInput from '../../components/components/common/TextInput/TextInput';
import useWindowSize from '../../components/hook/common/useWindowSize';

const Login = () => {
    const [loginInfo, setLoginInfo] = useState<LoginInfo>(new LoginInfo());

    const { width, height } = useWindowSize();

    const onInput = (text: string, key: keyof LoginInfo) => {
        setLoginInfo((prev) => {
            return { [key]: text, ...prev };
        });
    };

    const onPressLogin = () => {};

    return (
        <Box
            component='form'
            autoComplete='off'
            noValidate
            height={height}
            width={width}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <TextInput
                label={'Email'}
                placeHolder={'Email'}
                onInput={(text) => {
                    onInput(text, 'email');
                }}
                isRequired
                style={{ margin: '10px 0' }}
            />
            <TextInput
                label={'Password'}
                placeHolder={'Password'}
                onInput={(text) => {
                    onInput(text, 'password');
                }}
                isRequired
                style={{ margin: '10px 0' }}
            />
        </Box>
    );
};

export default Login;
