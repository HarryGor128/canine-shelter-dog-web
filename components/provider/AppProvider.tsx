'use client';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { StyledEngineProvider } from '@mui/material/styles';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
        </Provider>
    );
};

export default AppProvider;
