import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    createSlice,
    configureStore,
    PayloadAction
} from "@reduxjs/toolkit"


const searchSlice = createSlice({
    name: "Search",
    initialState: {
        search: ""
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    }
});

export const { setSearch } = searchSlice.actions;

export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
    }
})

export const RootState = store.getState();

export const selectSearch = (state) => state.search.search;