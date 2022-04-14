import { createSlice } from '@reduxjs/toolkit'


const urlSlice = createSlice({
    name: 'url',
    initialState: {
        sort: 'default',
        limit: 16
    },
    reducers: {
        addSearch(state, action) {
            for (let key of Object.keys(action.payload)) {
                state.search[key] = action.payload[key]
            }
        }
    }
})

export const { addSearch } = urlSlice.actions
export default urlSlice