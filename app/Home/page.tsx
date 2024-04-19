'use client';

import { useEffect, useState } from 'react';
import AppHeader from '../../components/components/common/AppHeader/AppHeader';
import dogServices from '../../components/services/dogServices';
import Dog from '../../components/type/Dog';
import DogList from '../../components/components/DogList/DogList';

const Home = () => {
    const [dogList, setDogList] = useState<Dog[]>([]);

    const getDogList = async () => {
        const result = await dogServices.getAllDogsInfo();
        setDogList(result);
    };

    useEffect(() => {
        getDogList();
    }, []);

    return (
        <>
            <AppHeader title={'Home'} />
            <DogList dogList={dogList} />
        </>
    );
};

export default Home;
