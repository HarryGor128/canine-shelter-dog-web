'use client';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import Dog from '../../type/Dog';
import AppTable from '../common/AppTable/AppTable';
import dateConverter from '../../utils/date/dateConverter';
import { useAppSelector } from '../../store/storeHooks';
import { Box, Modal, Stack, SxProps, Theme } from '@mui/material';
import { CSSProperties, useState } from 'react';
import TextInput from '../common/TextInput/TextInput';
import DatePicker from '../common/DatePicker/DatePicker';
import SexRadioButton from '../SexRadioButton/SexRadioButton';

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
        setSelectItem(new Dog());
    };

    const onInput = (text: string, key: keyof Dog) => {
        setSelectItem((prev) => {
            return { ...prev, [key]: text };
        });
    };

    const onChangeDate = (newDate: number) => {
        setSelectItem((prev) => {
            return { ...prev, dateOfBirth: newDate };
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
                        <img
                            src={selectItem.photo}
                            style={{
                                height: 200,
                                contain: 'content',
                            }}
                        />
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 2, sm: 4 }}
                            margin={'30px 0px 0px 0px'}
                        >
                            <TextInput
                                value={selectItem.name}
                                label={'Dog Name'}
                                placeHolder={'Dog Name'}
                                onInputText={(text) => {
                                    onInput(text, 'name');
                                }}
                                isRequired
                                error={isSubmitting && !selectItem.name}
                                disabled={!isStaff}
                            />
                            <DatePicker
                                value={selectItem.dateOfBirth}
                                label={'Date Of Birth'}
                                onChange={onChangeDate}
                                disabled={!isStaff}
                            />
                            <SexRadioButton
                                onChangeSex={(sex) => onInput(sex, 'sex')}
                                defaultValue={selectItem.sex}
                                disabled={!isStaff}
                            />
                            <TextInput
                                value={selectItem.breeds}
                                label={'Dog Breeds'}
                                placeHolder={'Dog Breeds'}
                                onInputText={(text) => {
                                    onInput(text, 'breeds');
                                }}
                                isRequired
                                error={isSubmitting && !selectItem.breeds}
                                disabled={!isStaff}
                            />
                            <TextInput
                                value={selectItem.description}
                                label={'Dog Description'}
                                placeHolder={'Dog Description'}
                                onInputText={(text) => {
                                    onInput(text, 'description');
                                }}
                                isRequired
                                error={isSubmitting && !selectItem.description}
                                disabled={!isStaff}
                            />
                        </Stack>
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
