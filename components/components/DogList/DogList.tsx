import Dog from '../../type/Dog';
import AppTable, { DisplayField } from '../common/AppTable/AppTable';

interface DogListProps {
    dogList: Dog[];
}

const DogList = ({ dogList }: DogListProps) => {
    const displayField: DisplayField[] = [
        {
            header: '',
            key: 'photo',
            isPhoto: true,
            bodyCellStyle: { align: 'center', style: { width: 200 } },
        },
        {
            header: 'Dog name',
            key: 'name',
        },
        {
            header: 'Date of birth',
            key: 'dateOfBirth',
        },
        {
            header: 'Sex',
            key: 'sex',
        },
    ];

    const onPressItem = (dog: Dog) => {};

    return (
        <div style={{ padding: 10 }}>
            <AppTable
                data={dogList}
                displayField={displayField}
                onPressItem={onPressItem}
            />
        </div>
    );
};

export default DogList;
