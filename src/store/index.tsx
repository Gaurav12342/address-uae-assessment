import {configureStore} from '@reduxjs/toolkit';
import UserListSlice from './user/userListSlice';

export const store = configureStore({
    reducer:{
        userList : UserListSlice   
    }
}) 