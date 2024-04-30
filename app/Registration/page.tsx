'use client';
import { useContext, useState } from 'react';
import RegistrationInfo from '../../components/type/RegistrationInfo';
import { Box, Stack } from '@mui/material';
import TextInput from '../../components/components/common/TextInput/TextInput';
import Button from '../../components/components/common/Button/Button';
import { Send } from '@mui/icons-material';
import AppSnackBarContext from '../../components/components/common/AppSnackBar/context/AppSnackBarContext';
import { useRouter } from 'next/navigation';
import authServices from '../../components/services/authServices';
import { setIsStaff } from '../../components/store/reducer/userSlice';
import { useAppDispatch } from '../../components/store/storeHooks';

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
                <TextInput
                    label={'Email'}
                    placeHolder={'Email'}
                    onInputText={(text) => {
                        onInput(text, 'email');
                    }}
                    isRequired
                    error={isSubmitting && !regInfo.email}
                />
                <TextInput
                    label={'Password'}
                    placeHolder={'Password'}
                    onInputText={(text) => {
                        onInput(text, 'password');
                    }}
                    isRequired
                    isSecret
                    error={isSubmitting && !regInfo.password}
                />
                <TextInput
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
