import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';

export interface AppTableProps {
    data: any[];
    displayField: GridColDef[];
    onPressItem?: GridEventListener<'rowClick'>;
    height?: number | string;
}

const AppTable = ({
    data,
    displayField,
    onPressItem,
    height,
}: AppTableProps) => {
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
            style={{ height }}
        />
    );
};

export default AppTable;
