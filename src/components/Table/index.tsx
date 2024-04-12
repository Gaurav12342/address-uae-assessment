import {Pagination, Box, TableRow, TableHead, Paper, Table, TableBody, TableCell, TableContainer} from '@mui/material';
import { IColumn, ITableComponentProps } from './types';

const TableComponent = (props:ITableComponentProps) => {
    const { rows, columns, isPagination = true, handleChangePagination, page = 1, count } = props;
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 380 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns?.map((column:IColumn) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.length ? rows.map((row:any) => {
                            return (
                                <TableRow tabIndex={-1} key={row.code}>
                                    {columns?.map((column:IColumn) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format
                                                    ? column.format(row, column)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        }) : <TableRow>
                            <TableCell>
                                Not Found.
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
                {isPagination && 
                <Box sx={{ my: 1, display: "flex", justifyContent: "end" }}>
                    <Pagination
                        showFirstButton
                        showLastButton
                        count={count}
                        page={page}
                        shape="rounded"
                        boundaryCount={2}
                        onChange={handleChangePagination}
                    />
                </Box>
                }
            </TableContainer>
        </Paper>
    );
}

export default TableComponent;