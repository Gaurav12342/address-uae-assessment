export interface ITableComponentProps {
    rows: any,
    columns: any,
    isPagination?: boolean,
    handleChangePagination?: any,
    page?: number,
    count?: any
}

export interface IColumn {
    id?: any,
    label?: string,
    align?: any,
    minWidth?: string,
    format?:any
}