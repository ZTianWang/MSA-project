import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrent } from "../../api/admin";

export interface AdminState {
    loading: boolean;
    admin: Admin;
    permissionList: Permission[];
}

const initialState: AdminState = {
    loading: false,
    admin: { id: 0, name: "" },
    permissionList: [] as Permission[]
}

export const adminState = createSlice({
    name: "adminState",
    initialState,
    reducers: {
        doLogout(state: AdminState) {
            state.admin = initialState.admin;
            state.loading = initialState.loading;
            state.permissionList = initialState.permissionList;
        },
    },
    // extraReducers(builder) {
    //     builder.addCase(
    //         getCurrentInfo.pending,
    //         (state, action) => {
    //             console.log(action);
    //             state.loading = true;
    //         }
    //     ).addCase(
    //         getCurrentInfo.fulfilled,
    //         (
    //             state,
    //             action: PayloadAction<{
    //                 admin: Admin;
    //                 permissionList: Permission[];
    //             }>
    //         ) => {
    //             state.loading = false;
    //             state.admin = action.payload.admin;
    //             state.permissionList = action.payload.permissionList;
    //         }
    //     );
    // },
});

// export const getCurrentItem = createAsyncThunk<{
//     item: Item;
//     permissionList: Permission[]
// }>("getCurrentItem", async () => {
//     const current = await getCurrent();
//     return {
//         ...current.data,
//     };
// })

// export const getCurrentInfo = createAsyncThunk<{
//     admin: Admin;
//     permissionList: Permission[]
// }>("getCurrentInfo", async () => {
//     const current = await getCurrent();
//     return {
//         ...current.data,
//     };
// })

export const { doLogout } = adminState.actions;
export default adminState.reducer;