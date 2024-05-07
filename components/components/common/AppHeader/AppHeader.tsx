'use client';

import { ReactNode, useEffect, useState } from 'react';

import { Add, Favorite, Home } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import { useAppSelector } from '../../../store/storeHooks';

interface AppHeaderProps {
    title: string;
}

interface Navigator {
    label: string;
    icon: ReactNode;
    goToPage: Function;
}

const AppHeader = ({ title }: AppHeaderProps) => {
    const router = useRouter();

    const { userInfo, isStaff } = useAppSelector((state) => state.user);
    const { isLogin } = useAppSelector((state) => state.appState);

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const mainNavigator: Navigator[] = [
        {
            label: 'Home',
            icon: <Home />,
            goToPage: () => {
                router.push('/Home');
            },
        },
    ];

    const staffNavigator: Navigator[] = mainNavigator.concat([
        {
            label: 'Add',
            icon: <Add />,
            goToPage: () => {
                router.push('/AddDog');
            },
        },
    ]);

    const publicNavigator: Navigator[] = mainNavigator.concat([
        {
            label: 'Favorites',
            icon: <Favorite />,
            goToPage: () => {
                router.push('/Favorites');
            },
        },
    ]);

    const [navigator, setNavigator] = useState<Navigator[]>(mainNavigator);

    useEffect(() => {
        if (isStaff) {
            setNavigator(staffNavigator);
        } else {
            setNavigator(publicNavigator);
        }
    }, [isStaff]);

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
                        {`Hi, ${isLogin ? userInfo.user.email : 'Anonymous'}`}
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
                <Box
                    sx={{ width: 250 }}
                    role='presentation'
                    onClick={onCloseDrawer}
                >
                    <List>
                        {navigator.map((nav, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        nav.goToPage();
                                        onCloseDrawer();
                                    }}
                                >
                                    <ListItemIcon>{nav.icon}</ListItemIcon>
                                    <ListItemText primary={nav.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default AppHeader;
