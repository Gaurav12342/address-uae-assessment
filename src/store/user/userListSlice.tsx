import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUserListApiParams, IinitialState } from './types';
import { BASE_URL } from '../constant';

const initialState: IinitialState = {
    loading: false,
    data: [],
    error: ""
}

export const userListAPI: any = createAsyncThunk("user-list", async ({ skip = 0, limit = 5, key, value }: IUserListApiParams)=> {
    try {
        let url = `${BASE_URL}/users`;
        if (key && value) {
            url += `/filter?key=${key}&value=${value}`;
        }
        url += `${key && value ? "&" : "?"}skip=${skip}&limit=${limit}`;
        
        const response = await axios.get(url);
        
        if (response?.status === 200) {
            return response?.data;
        }
    } catch (error) {
        return error;
    }
});

// export const userListAPI: any = createAsyncThunk("user-list", async ({ skip = 0, limit = 5, key, value }: { skip: any, limit: any, key: string, value : string })=> {
//     try {
//         const response = await axios.get(`https://dummyjson.com/users/filter?key=${key}&value=${value}&skip=${skip}&limit=${limit}`);
//         if (response?.status === 200) {
//             return response?.data
//         }
//     } catch (error) {
//         return error
//     }
// });

const UserListSlice: any = createSlice({
    name: "user-list",
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(userListAPI.pending, (state: any, _: any) => {
            state.loading = true;
        });

        builder.addCase(userListAPI.fulfilled, (state: any, action: any) => {
            state.loading = false;
            state.data = action.payload;

        });

        builder.addCase(userListAPI.rejected, (state: any, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
    },

});

export default UserListSlice.reducer;