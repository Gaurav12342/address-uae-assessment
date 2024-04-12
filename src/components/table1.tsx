import { useState, MouseEvent, useMemo, ChangeEvent } from 'react';
import { TablePagination, Pagination, Paper, TableSortLabel, TableRow, TableHead, TableContainer, Box, Table, TableBody, TableCell } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

type Order = 'asc' | 'desc';

function EnhancedTableHead(props: any) {
    const { headCells, order, orderBy, onRequestSort } = props;
    const createSortHandler =
        (property: any) => (event: MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell: any) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable(props: any) {
    const { handleChangeRowsPerPage, rowsPerPage, page, headCells, rows, isPagination = true, handleChangePagination, count } = props;
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<any>('id');
    const [selected, setSelected] = useState<readonly number[]>([]);

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
    ): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        console.log({stabilizedThis});
        return stabilizedThis.map((el) => el[0]);
    }

    const handleRequestSort = (
        event: MouseEvent<unknown>,
        property: any,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.checked) {
    //         const newSelected = rows.map((n: any) => n.id);
    //         setSelected(newSelected);
    //         return;
    //     }
    //     setSelected([]);
    // };

    const handleClick = (event: MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };



    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rows, rowsPerPage, handleChangePagination],
    );

    // console.log("visibleRows =>",visibleRows);
    // console.log("page =>",page);
    // console.log("rowsPerPage =>",rowsPerPage);
    // console.log("page =>",page);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            // onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {visibleRows.map((row: any) => {
                                const isItemSelected = isSelected(row.id);
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        // aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        {headCells?.map((column: any) => {
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
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

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

{/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePagination}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
                </Box>
            }
        </Box>
    );
}
