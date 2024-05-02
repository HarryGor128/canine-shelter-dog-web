'use client';

import { CSSProperties, ChangeEvent, useContext, useState } from 'react';

import { Add } from '@mui/icons-material';

import DogDetail from '../../components/components/DogDetail/DogDetail';
import AppHeader from '../../components/components/common/AppHeader/AppHeader';
import AppSnackBarContext from '../../components/components/common/AppSnackBar/context/AppSnackBarContext';
import { ButtonProps } from '../../components/components/common/Button/Button';
import ButtonGroup from '../../components/components/common/ButtonGroup/ButtonGroup';
import dogServices from '../../components/services/dogServices';
import Dog from '../../components/type/Dog';
import UploadFile from '../../components/type/UploadFile';
import convertBase64 from '../../components/utils/base64Converter';
import dateConverter from '../../components/utils/date/dateConverter';

const AddDog = () => {
    const [dogInfo, setDogInfo] = useState<Dog>(new Dog());
    const [uploadFile, setUploadFile] = useState<UploadFile>(new UploadFile());
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { setIsOpen, setMsg, setType } = useContext(AppSnackBarContext);

    const onInput = (value: string | number, key: keyof Dog) => {
        setDogInfo((prev) => {
            return { ...prev, [key]: value };
        });
    };

    const onAddDog = async () => {
        setIsSubmitting(true);

        const uploadPhotoResult = await dogServices.uploadDogPhoto(uploadFile);
        if (uploadPhotoResult) {
            const result = await dogServices.addDogInfo({
                ...dogInfo,
                photo: uploadPhotoResult,
            });

            if (result.result) {
                setMsg('Add Success');
                setType('success');
            } else {
                setMsg(result.msg);
                setType('error');
            }
        } else {
            setMsg('Error');
            setType('error');
        }
        setIsOpen(true);
    };

    const onUploadPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
        const fileList: FileList | null = event.target.files;
        if (fileList) {
            const file = fileList[0];
            const base64 = await convertBase64(file);

            const fileName = file.name.split('.');
            const fileType = fileName[fileName.length - 1];

            setDogInfo((prev) => {
                return { ...prev, photo: base64 as string };
            });
            setUploadFile({
                base64: base64 as string,
                fileName: `${dateConverter.nowFileName()}.${fileType}`,
            });
        }
    };

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
