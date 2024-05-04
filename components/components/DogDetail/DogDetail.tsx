import { ChangeEvent, useRef } from 'react';

import { UploadFile as UploadIcon } from '@mui/icons-material';
import { Stack } from '@mui/material';

import DatePicker from '../common/DatePicker/DatePicker';
import TextInput from '../common/TextInput/TextInput';

import { useAppSelector } from '../../store/storeHooks';
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
    const fileInput = useRef<HTMLInputElement>(null);

    const { isStaff } = useAppSelector((state) => state.user);

    const onUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const fileList: FileList | null = event.target.files;
        if (fileList) {
            const file = fileList[0];
            const base64 = await convertBase64(file);

            const fileName = file.name.split('.');
            const fileType = fileName[fileName.length - 1];

            const result: UploadFile = {
                base64,
                fileName: `${dateConverter.nowFileName()}.${fileType}`,
            };
            onUploadPhoto(result);

            if (fileInput.current) {
                fileInput.current.value = '';
            }
        }
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
                />
            ) : (
                <div
                    style={{
                        height: 80,
                        width: 80,
                        borderRadius: 1000,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        backgroundColor: '#00000050',
                    }}
                >
                    <UploadIcon color={'primary'} fontSize={'large'} />
                </div>
            )}
            {isStaff && (
                <input
                    ref={fileInput}
                    style={{ margin: '20px 0 0 0' }}
                    onChange={onUpload}
                    type={'file'}
                    accept={'image/*'}
                />
            )}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 4 }}
                useFlexGap
                flexWrap={'wrap'}
                justifyContent={'center'}
                margin={'30px 0px 0px 0px'}
            >
                <TextInput
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
                <TextInput
                    value={dogInfo.breeds}
                    label={'Dog Breeds'}
                    placeHolder={'Dog Breeds'}
                    onInputText={(text) => {
                        onInput(text, 'breeds');
                    }}
                    isRequired
                    error={isSubmitting && !dogInfo.breeds}
                    disabled={!isStaff}
                />
                <TextInput
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
