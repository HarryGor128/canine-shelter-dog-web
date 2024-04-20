import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableCellProps,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

export interface DisplayField {
    header: string;
    key: string;
    isPhoto?: boolean;
    bodyCellStyle?: TableCellProps;
}

export interface AppTableProps {
    data: any[];
    displayField: DisplayField[];
    onPressItem?: Function;
}

const AppTable = ({ data, displayField, onPressItem }: AppTableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        {displayField.map((item) => (
                            <TableCell key={item.key}>{item.header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            hover={onPressItem ? true : false}
                            key={index}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                            onClick={() => {
                                if (onPressItem) {
                                    onPressItem(row);
                                }
                            }}
                        >
                            {displayField.map((cell) => (
                                <>
                                    {cell.isPhoto ? (
                                        <TableCell
                                            key={cell.key}
                                            {...cell.bodyCellStyle}
                                        >
                                            <img
                                                src={row[cell.key]}
                                                style={{
                                                    aspectRatio: 'auto',
                                                    height: 100,
                                                }}
                                            />
                                        </TableCell>
                                    ) : (
                                        <TableCell key={cell.key}>
                                            {row[cell.key]}
                                        </TableCell>
                                    )}
                                </>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AppTable;
