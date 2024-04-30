'use client';
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
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector } from '../../../store/storeHooks';
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Add } from '@mui/icons-material';

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

    const { userInfo } = useAppSelector((state) => state.user);
    const { isLogin } = useAppSelector((state) => state.appState);

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const navigator: Navigator[] = [
        {
            label: 'Add',
            icon: <Add />,
            goToPage: () => {},
        },
    ];

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
