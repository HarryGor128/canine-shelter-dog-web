'use client';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector } from '../../../store/storeHooks';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppDrawer from './components/AppDrawer/AppDrawer';

interface AppHeaderProps {
    title: string;
}

const AppHeader = ({ title }: AppHeaderProps) => {
    const router = useRouter();

    const { userInfo } = useAppSelector((state) => state.user);
    const { isLogin } = useAppSelector((state) => state.appState);

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const onClickMenu = () => {
        setOpenDrawer(true);
    };

    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const onClickLogin = (goToPage: string) => {
        router.push(`/${goToPage}`);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static'>
                    <Toolbar>
                        {isLogin && (
                            <IconButton
                                size='large'
                                edge='start'
                                color='inherit'
                                aria-label='menu'
                                sx={{ mr: 2 }}
                                onClick={onClickMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <Typography
                            variant='h6'
                            component='div'
                            sx={{ flexGrow: 1 }}
                        >
                            {title}
                        </Typography>
                        {`Hi, ${userInfo.toString()}`}
                        <Button
                            color='inherit'
                            onClick={() => {
                                onClickLogin(isLogin ? 'Logout' : 'Login');
                            }}
                        >
                            {isLogin ? 'Logout' : 'Login'}
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer open={openDrawer} onClose={onCloseDrawer}>
                <AppDrawer />
            </Drawer>
        </>
    );
};

export default AppHeader;
