'use client';

import { CSSProperties, useContext, useState } from 'react';

import { Close, Delete, Send } from '@mui/icons-material';
import { Box, Modal, SxProps, Theme } from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';

import AppSnackBarContext from '../common/AppSnackBar/context/AppSnackBarContext';
import AppTable from '../common/AppTable/AppTable';
import { ButtonProps } from '../common/Button/Button';
import ButtonGroup from '../common/ButtonGroup/ButtonGroup';

import dogServices from '../../services/dogServices';
import { useAppSelector } from '../../store/storeHooks';
import Dog from '../../type/Dog';
import UploadFile from '../../type/UploadFile';
import dateConverter from '../../utils/date/dateConverter';
import DogDetail from '../DogDetail/DogDetail';

interface DogListProps {
    dogList: Dog[];
    refreshList?: Function;
}

const DogList = ({ dogList, refreshList }: DogListProps) => {
    const [showItemDetail, setShowItemDetail] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [selectItem, setSelectItem] = useState<Dog>(new Dog());
    const [uploadFile, setUploadFile] = useState<UploadFile>(new UploadFile());

    const { isStaff } = useAppSelector((state) => state.user);

    const { setIsOpen, setMsg, setType } = useContext(AppSnackBarContext);

    const displayField: GridColDef[] = [
        { field: 'name', headerName: 'Name', minWidth: 150 },
        {
            field: 'dateOfBirth',
            headerName: 'Date of birth (Age)',
            minWidth: 200,
            valueFormatter: (value) => {
                const dateOfBirth = dateConverter.unixTimeToDateString(value);
                const age = dateConverter.getAge(value);

                return `${dateOfBirth} (${age})`;
            },
            filterable: false,
        },
        { field: 'sex', headerName: 'Sex', minWidth: 50 },
        { field: 'breeds', headerName: 'Breeds', minWidth: 250 },
    ];

    const onPressItem = (event: GridRowParams<any>) => {
        setShowItemDetail(true);
        setSelectItem(event.row);
    };

    const onCloseItem = () => {
        setShowItemDetail(false);
        setIsSubmitting(false);
        setSelectItem(new Dog());
    };

    const onInput = (value: string | number, key: keyof Dog) => {
        console.log('🚀 ~ file: DogList.tsx:66 ~ onInput ~ value:', value);
        setSelectItem((prev) => {
            return { ...prev, [key]: value };
        });
    };

    const onUploadPhoto = (file: UploadFile) => {
        setSelectItem((prev) => {
            return { ...prev, photo: file.base64 };
        });
        setUploadFile(file);
    };

    const onUpdateDog = async () => {
        setIsSubmitting(true);

        const uploadPhotoResult = uploadFile
            ? await dogServices.uploadDogPhoto(uploadFile)
            : '';

        const result = await dogServices.updateDogInfo(
            uploadPhotoResult
                ? {
                      ...selectItem,
                      photo: uploadPhotoResult,
                  }
                : selectItem,
        );

        if (result.result) {
            setMsg('Update Success');
            setType('success');
            setIsOpen(true);

            onCloseItem();
        }

        if (refreshList) {
            refreshList();
        }
    };

    const onDeleteDog = async () => {
        const result = await dogServices.deleteDogInfo(selectItem.id);

        if (result.result) {
            setMsg('Delete Success');
            setType('success');
            onCloseItem();
        } else {
            setMsg('Delete Fail');
            setType('error');
        }
        setIsOpen(true);

        if (refreshList) {
            refreshList();
        }
    };

    let buttonGroup: ButtonProps[] = [
        {
            onPress: onCloseItem,
            text: 'Close',
            endIcon: <Close />,
        },
    ];

    if (isStaff) {
        buttonGroup = buttonGroup.concat([
            {
                onPress: onUpdateDog,
                text: 'Update',
                endIcon: <Send />,
            },
            {
                onPress: onDeleteDog,
                text: 'Delete',
                endIcon: <Delete />,
            },
        ]);
    }

    return (
        <div style={{ padding: 10 }}>
            <AppTable
                data={dogList}
                displayField={displayField}
                onPressItem={onPressItem}
            />
            <Modal open={showItemDetail} onClose={onCloseItem}>
                <Box sx={popupStyle}>
                    <div style={popupBox}>
                        <DogDetail
                            dogInfo={selectItem}
                            onInput={onInput}
                            onUploadPhoto={onUploadPhoto}
                            isSubmitting={isSubmitting}
                        />
                        <ButtonGroup buttonGroup={buttonGroup} />
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default DogList;

const popupStyle: SxProps<Theme> = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
    borderRadius: 10,
};

const popupBox: CSSProperties = {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
};
