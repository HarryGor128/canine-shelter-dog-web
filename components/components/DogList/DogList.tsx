import { GridColDef, GridRowParams } from '@mui/x-data-grid';
import Dog from '../../type/Dog';
import AppTable from '../common/AppTable/AppTable';

interface DogListProps {
    dogList: Dog[];
}

const DogList = ({ dogList }: DogListProps) => {
    const displayData = dogList;

    const displayField: GridColDef[] = [
        { field: 'name', headerName: 'Name', minWidth: 150 },
        { field: 'dateOfBirth', headerName: 'Date of birth', minWidth: 120 },
        { field: 'sex', headerName: 'Sex', minWidth: 50 },
        { field: 'breeds', headerName: 'Breeds', minWidth: 100 },
    ];

    const onPressItem = (event: GridRowParams<any>) => {
        console.log('🚀 ~ file: DogList.tsx:20 ~ onPressItem ~ event:', event);
    };

    return (
        <div style={{ padding: 10 }}>
            <AppTable
                data={displayData}
                displayField={displayField}
                onPressItem={onPressItem}
            />
        </div>
    );
};

export default DogList;
