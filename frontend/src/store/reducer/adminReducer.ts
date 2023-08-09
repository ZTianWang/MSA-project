import { createSlice } from "@reduxjs/toolkit";

export interface AdminState {
    loading: boolean;
    admin: Admin;
}

const initialState: AdminState = {
    loading: false,
    admin: { id: 0, name: "" },
}

export const adminState = createSlice({
    name: "adminState",
    initialState,
    reducers: {
        doLogout(state: AdminState) {
            state.admin = initialState.admin;
            state.loading = initialState.loading;
        },
    },
});


export const { doLogout } = adminState.actions;
export default adminState.reducer;