'use client';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import Dog from '../../type/Dog';
import AppTable from '../common/AppTable/AppTable';
import dateConverter from '../../utils/date/dateConverter';
import { Box, Modal, SxProps, Theme } from '@mui/material';
import { CSSProperties, useState } from 'react';
import { Close } from '@mui/icons-material';
import DogDetail from '../DogDetail/DogDetail';
import ButtonGroup from '../common/ButtonGroup/ButtonGroup';

interface DogListProps {
    dogList: Dog[];
}

const DogList = ({ dogList }: DogListProps) => {
    const [showItemDetail, setShowItemDetail] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [selectItem, setSelectItem] = useState<Dog>(new Dog());

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
        setSelectItem(new Dog());
    };

    const onInput = (value: string | number, key: keyof Dog) => {
        setSelectItem((prev) => {
            return { ...prev, [key]: value };
        });
    };

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
                        <ButtonGroup
                            buttonGroup={[
                                {
                                    onPress: onCloseItem,
                                    text: 'Close',
                                    startIcon: <Close />,
                                },
                            ]}
                        />
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
    borderRadius: 10,
};

const popupBox: CSSProperties = {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
    flexDirection: 'column',
};
