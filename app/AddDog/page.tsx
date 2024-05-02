'use client';

import { CSSProperties, useState } from 'react';

import { Add } from '@mui/icons-material';

import DogDetail from '../../components/components/DogDetail/DogDetail';
import AppHeader from '../../components/components/common/AppHeader/AppHeader';
import { ButtonProps } from '../../components/components/common/Button/Button';
import ButtonGroup from '../../components/components/common/ButtonGroup/ButtonGroup';
import Dog from '../../components/type/Dog';

const AddDog = () => {
    const [dogInfo, setDogInfo] = useState<Dog>(new Dog());
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const onInput = (value: string | number, key: keyof Dog) => {
        setDogInfo((prev) => {
            return { ...prev, [key]: value };
        });
    };

    const onAddDog = () => {};

    const onUploadPhoto = () => {};

    const buttonGroup: ButtonProps[] = [
        {
            onPress: onAddDog,
            text: 'Add',
            endIcon: <Add />,
        },
    ];

    return (
        <>
            <AppHeader title={'Add New Dog'} />
            <div style={popupBox}>
                <DogDetail
                    dogInfo={dogInfo}
                    onInput={onInput}
                    onUploadPhoto={onUploadPhoto}
                    isSubmitting={isSubmitting}
                />
                <ButtonGroup buttonGroup={buttonGroup} />
            </div>
        </>
    );
};

export default AddDog;

const popupBox: CSSProperties = {
    margin: '50px 0',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflow: 'auto',
};
