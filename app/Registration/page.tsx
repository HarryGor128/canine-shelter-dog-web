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
import RegistrationInfo from '../../components/type/RegistrationInfo';

const Registration = () => {
    const [regInfo, setRegInfo] = useState<RegistrationInfo>(
        new RegistrationInfo(),
    );
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const router = useRouter();

    const dispatch = useAppDispatch();

    const { setIsOpen, setMsg, setType } = useContext(AppSnackBarContext);

    const onInput = (text: string, key: keyof RegistrationInfo) => {
        setRegInfo((prev) => {
            return { ...prev, [key]: text };
        });
    };

    const onPressReg = async () => {
        setIsSubmitting(true);

        if (regInfo.email && regInfo.password) {
            const result = await authServices.registration(regInfo);
            if (result.result) {
                setMsg('Registration Success');
                setType('success');
                setIsOpen(true);

                const getRole = await authServices.roleQuery(regInfo.email);
                dispatch(setIsStaff(getRole));

                router.back();
            }
        } else {
            setMsg('Please input Email / Password');
            setType('error');
            setIsOpen(true);
        }
    };

    const onPressLogin = () => {
        router.replace('/Login');
    };

    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            minHeight={'100vh'}
        >
            <Stack direction={'column'} spacing={2}>
                <div style={{ alignSelf: 'center' }}>Registration</div>
                <TextFieldInput
                    label={'Email'}
                    placeHolder={'Email'}
                    onInputText={(text) => {
                        onInput(text, 'email');
                    }}
                    isRequired
                    error={isSubmitting && !regInfo.email}
                />
                <TextFieldInput
                    label={'Password'}
                    placeHolder={'Password'}
                    onInputText={(text) => {
                        onInput(text, 'password');
                    }}
                    isRequired
                    isSecret
                    error={isSubmitting && !regInfo.password}
                />
                <TextFieldInput
                    label={'Sign Up Code'}
                    placeHolder={'Sign Up Code'}
                    onInputText={(text) => {
                        onInput(text, 'signUpCode');
                    }}
                />
                <Button
                    onPress={() => {
                        onPressReg();
                    }}
                    text={'Registration'}
                    endIcon={<Send />}
                    disabled={!regInfo.email || !regInfo.password}
                />
                <Button
                    onPress={() => {
                        onPressLogin();
                    }}
                    text={'Login'}
                    variant={'text'}
                />
            </Stack>
        </Box>
    );
};

export default Registration;
