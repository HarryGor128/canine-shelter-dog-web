'use client';

import { useEffect, useState } from 'react';

import DogList from '../../components/components/DogList/DogList';
import AppHeader from '../../components/components/common/AppHeader/AppHeader';
import dogServices from '../../components/services/dogServices';
import favoritesServices from '../../components/services/favoritesServices';
import { useAppSelector } from '../../components/store/storeHooks';
import Dog from '../../components/type/Dog';

const Favorites = () => {
    const { userInfo } = useAppSelector((state) => state.user);

    const [dogList, setDogList] = useState<Dog[]>([]);

    const getDogList = async () => {
        const idList = await favoritesServices.getUserFavoritesList(
            userInfo.user.email,
        );
        if (idList.length > 0) {
            const result = await dogServices.getDogWithList(idList);
            if (result.length > 0) {
                setDogList(result);
                return;
            }
        }

        setDogList([]);
    };

    useEffect(() => {
        getDogList();
    }, []);

    return (
        <>
            <AppHeader title={'Favorites'} />
            {dogList.length > 0 ? (
                <DogList dogList={dogList} refreshList={getDogList} />
            ) : (
                <div
                    style={{
                        flex: 1,
                        justifySelf: 'center',
                        alignItems: 'center',
                    }}
                >
                    No Result
                </div>
            )}
        </>
    );
};

export default Favorites;
