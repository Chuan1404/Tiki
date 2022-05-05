import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        city: 'Thành Phố Hồ Chí Minh',
        district: 'Quận 12',
        ward: 'Phường Tân Thới Nhất'
    },
    reducers: {
        update: (state, action) => {
            state.city = action.payload.city;
            state.district = action.payload.district;
            state.ward = action.payload.ward
        }
    }
})

export const { update } = addressSlice.actions;
export default addressSlice;
