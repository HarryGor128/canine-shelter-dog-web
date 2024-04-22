'use client';

import { Alert, AlertColor, Snackbar } from '@mui/material';
import { ReactNode, useState } from 'react';
import AppSnackBarContext, {
    AppSnackBarContextType,
} from './context/AppSnackBarContext';

interface Props {
    children: ReactNode;
}

const AppSnackBar = ({ children }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [type, setType] = useState<AlertColor>('info');
    const [msg, setMsg] = useState<string>('');
    const [autoHideDuration, setAutoHideDuration] = useState<number>(3000);

    const value: AppSnackBarContextType = {
        isOpen,
        setIsOpen,
        type,
        setType,
        msg,
        setMsg,
        autoHideDuration,
        setAutoHideDuration,
    };

    const onClose = () => {
        setIsOpen(false);
        setType('info');
        setMsg('');
        setAutoHideDuration(5000);
    };

    return (
        <AppSnackBarContext.Provider value={value}>
            {children}
            <Snackbar
                open={isOpen}
                autoHideDuration={autoHideDuration}
                onClose={onClose}
            >
                <Alert severity={type}>{msg}</Alert>
            </Snackbar>
        </AppSnackBarContext.Provider>
    );
};

export default AppSnackBar;
