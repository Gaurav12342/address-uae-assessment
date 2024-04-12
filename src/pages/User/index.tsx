import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TableContainer, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomBreadcrumb from '../../components/BreadCrumb';
import { userListAPI } from '../../store/user/userListSlice';
import TableComponent from '../../components/Table';
import FilterComponent from '../../components/FilterComponent/index';

const User = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userResponse = useSelector((state: any) => state?.userList);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState({});

    const handleClick = (data: string) => {
        switch (data) {
            case "home":
                return navigate("/")
            case "administrator":
                return navigate("/")
            case "user_list":
                return navigate("/user")
            default:
                return navigate("/")
        }
    }

    const breadcrumbItems = [
        { label: 'Home', onClick: () => handleClick("home"), selected: true },
        { label: 'Administrators', onClick: () => handleClick("administrator"), selected: true },
        { label: 'user list', onClick: () => handleClick("user_list"), selected: true }
    ];

    const columns = [
        {
            id: 'id',
            label: 'User Id',

        },
        {
            id: 'firstName',
            label: 'First Name',

        },
        {
            id: 'lastName',
            label: 'Last Name',

        },
        {
            id: 'email',
            label: 'Email',

        },
        {
            id: 'domain',
            label: 'Domain',

        },
        {
            id: 'birthDate',
            label: 'DOB',

        },

    ];

    useEffect(() => {
        const params: any = {
            skip: page, limit: 5
        }
        dispatch(userListAPI(params));
    }, [page]);

    const handleChangePagination = (_: any, value: number) => {
        setPage(value);
    }

    const handleChangeSearchInput = (event: any) => {
        const { name, value } = event.target;
        setSearchValue({ [name]: value });
    }

    const handleSubmitSearch = () => {
        const searchData = Object.entries(searchValue)
        const params: any = {
            skip: page, 
            limit: 5,
            key : searchData[0]?.[0],
            value : searchData[0]?.[1],
        }
        dispatch(userListAPI(params));
    }
    return (
        <>
            <CustomBreadcrumb handleClick={handleClick} breadcrumbItems={breadcrumbItems} />

            <FilterComponent handleSearch={handleSubmitSearch} handleChange={handleChangeSearchInput} />

            <TableContainer component={Paper}>
                <TableComponent handleChangePagination={handleChangePagination} columns={columns} count={userResponse?.data?.total} rows={userResponse?.data?.users ?? []} page={page} />
            </TableContainer>
        </>
    )
}
export default User;