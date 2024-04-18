'use client';

import { useEffect } from 'react';
import AppHeader from '../../components/components/common/AppHeader/AppHeader';
import dogServices from '../../components/services/dogServices';

const Home = () => {
    const getDogList = async () => {
        await dogServices.getAllDogsInfo();
    };

    useEffect(() => {
        getDogList();
    }, []);

    return (
        <>
            <AppHeader title={'Home'} />
        </>
    );
};

export default Home;
