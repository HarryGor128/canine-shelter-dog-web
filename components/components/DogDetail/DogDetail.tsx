import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { UploadFile as UploadIcon } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';

import DatePicker from '../common/DatePicker/DatePicker';
import DropDownList from '../common/DropDownList/DropDownList';
import TextFieldInput from '../common/TextFieldInput/TextFieldInput';

import dogServices from '../../services/dogServices';
import { setDogBreedsList } from '../../store/reducer/dogSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import Dog from '../../type/Dog';
import UploadFile from '../../type/UploadFile';
import convertBase64 from '../../utils/base64Converter';
import dateConverter from '../../utils/date/dateConverter';
import SexRadioButton from '../SexRadioButton/SexRadioButton';

interface DogDetailProps {
    dogInfo: Dog;
    onInput: (value: string | number, key: keyof Dog) => void;
    onUploadPhoto: (file: UploadFile) => void;
    isSubmitting?: boolean;
}

const DogDetail = ({
    dogInfo,
    onInput,
    onUploadPhoto,
    isSubmitting,
}: DogDetailProps) => {
    const { isStaff } = useAppSelector((state) => state.user);
    const { dogBreedsList } = useAppSelector((state) => state.dog);

    const [breedImg, setBreedImg] = useState<string>('');

    const uploadRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const getBreedsList = async () => {
            const result = await dogServices.getDogBreedsList();
            dispatch(setDogBreedsList(result));
        };

        if (dogBreedsList.length <= 0) {
            getBreedsList();
        }
    }, []);

    useEffect(() => {
        const getBreedImg = async () => {
            const result = await dogServices.getBreedImg(dogInfo.breeds);
            setBreedImg(result);
        };

        if (isStaff && dogInfo.breeds && !breedImg.includes(dogInfo.breeds)) {
            getBreedImg();
        }
    }, [dogInfo.breeds, isStaff]);

    const onUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file =
            event &&
            event.target &&
            event.target.files &&
            event.target.files[0];

        if (file) {
            const base64 = await convertBase64(file);

            const fileName = file.name.split('.');
            const fileType = fileName[fileName.length - 1];

            const result: UploadFile = {
                base64,
                fileName: `${dateConverter.nowFileName()}.${fileType}`,
            };
            onUploadPhoto(result);
        }
    };

    const onPressUpload = () => {
        uploadRef.current?.click();
    };

    return (
        <>
            {dogInfo.photo ? (
                <img
                    src={dogInfo.photo}
                    style={{
                        height: 200,
                        contain: 'content',
                    }}
                    onClick={onPressUpload}
                />
            ) : (
                <IconButton color={'primary'} onClick={onPressUpload}>
                    <UploadIcon fontSize={'large'} />
                </IconButton>
            )}
            <input
                ref={uploadRef}
                style={{ display: 'none' }}
                onChange={onUpload}
                type={'file'}
                accept={'image/*'}
            />
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 4 }}
                useFlexGap
                flexWrap={'wrap'}
                justifyContent={'center'}
                margin={'30px 0px 0px 0px'}
            >
                <TextFieldInput
                    value={dogInfo.name}
                    label={'Dog Name'}
                    placeHolder={'Dog Name'}
                    onInputText={(text) => {
                        onInput(text, 'name');
                    }}
                    isRequired
                    error={isSubmitting && !dogInfo.name}
                    disabled={!isStaff}
                />
                <DatePicker
                    value={dogInfo.dateOfBirth}
                    label={'Date Of Birth'}
                    onChange={(date) => {
                        onInput(date, 'dateOfBirth');
                    }}
                    disabled={!isStaff}
                    isRequired
                />
                <SexRadioButton
                    onChangeSex={(sex) => onInput(sex, 'sex')}
                    defaultValue={dogInfo.sex}
                    disabled={!isStaff}
                    error={isSubmitting && !dogInfo.sex}
                />
                <div
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <DropDownList
                        label={'Dog Breed'}
                        optionList={dogBreedsList.map((item) => {
                            return { value: item, label: item };
                        })}
                        onSelectOption={(value) => {
                            onInput(value, 'breeds');
                        }}
                        defaultValue={dogInfo.breeds}
                        disabled={!isStaff}
                        isRequired
                        error={isSubmitting && !dogInfo.breeds}
                    />
                    {isStaff && (
                        <img
                            src={breedImg}
                            style={{
                                margin: '0 20px',
                                contain: 'content',
                                height: 100,
                            }}
                        />
                    )}
                </div>
                <TextFieldInput
                    value={dogInfo.description}
                    label={'Dog Description'}
                    placeHolder={'Dog Description'}
                    onInputText={(text) => {
                        onInput(text, 'description');
                    }}
                    isRequired
                    error={isSubmitting && !dogInfo.description}
                    disabled={!isStaff}
                />
            </Stack>
        </>
    );
};

export default DogDetail;
