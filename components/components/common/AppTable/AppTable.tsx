import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';

export interface AppTableProps {
    data: any[];
    displayField: GridColDef[];
    onPressItem?: GridEventListener<'rowClick'>;
}

const AppTable = ({ data, displayField, onPressItem }: AppTableProps) => {
    return (
        <DataGrid
            rows={data}
            columns={displayField}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 50 },
                },
            }}
            pageSizeOptions={[30, 50, 100]}
            onRowClick={onPressItem}
            disableMultipleRowSelection
        />
    );
};

export default AppTable;
