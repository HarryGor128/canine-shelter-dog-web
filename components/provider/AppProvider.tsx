'use client';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { StyledEngineProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                    {children}
                </LocalizationProvider>
            </StyledEngineProvider>
        </Provider>
    );
};

export default AppProvider;
