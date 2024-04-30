'use client';

import { CSSProperties, useState } from 'react';

import { Close, Send } from '@mui/icons-material';
import { Box, Modal, SxProps, Theme } from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';

import AppTable from '../common/AppTable/AppTable';
import { ButtonProps } from '../common/Button/Button';
import ButtonGroup from '../common/ButtonGroup/ButtonGroup';

import { useAppSelector } from '../../store/storeHooks';
import Dog from '../../type/Dog';
import dateConverter from '../../utils/date/dateConverter';
import DogDetail from '../DogDetail/DogDetail';

interface DogListProps {
    dogList: Dog[];
}

const DogList = ({ dogList }: DogListProps) => {
    const [showItemDetail, setShowItemDetail] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [selectItem, setSelectItem] = useState<Dog>(new Dog());

    const { isStaff } = useAppSelector((state) => state.user);

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
        setSelectItem((prev) => {
            return { ...prev, [key]: value };
        });
    };

    const onUpdateDog = () => {
        setIsSubmitting(true);
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
