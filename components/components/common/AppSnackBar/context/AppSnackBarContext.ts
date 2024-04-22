'use client';
import { AlertColor } from '@mui/material';
import { createContext, Dispatch, SetStateAction } from 'react';

export type AppSnackBarContextType = {
    isOpen: boolean;
    type: AlertColor;
    msg: string;
    autoHideDuration: number;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setType: Dispatch<SetStateAction<AlertColor>>;
    setMsg: Dispatch<SetStateAction<string>>;
    setAutoHideDuration: Dispatch<SetStateAction<number>>;
};

export const defaultAppSnackBarContext: AppSnackBarContextType = {
    isOpen: false,
    type: 'info',
    msg: '',
    autoHideDuration: 3000,
    setIsOpen: () => {},
    setType: () => {},
    setMsg: () => {},
    setAutoHideDuration: () => {},
};

const AppSnackBarContext = createContext(defaultAppSnackBarContext);

export default AppSnackBarContext;
