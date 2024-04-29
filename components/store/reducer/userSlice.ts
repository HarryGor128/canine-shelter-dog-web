import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import UserInfo from '../../type/UserInfo';

// Define a type for the slice state
interface User {
    userInfo: UserInfo;
    isStaff: boolean;
}

// Define the initial state using that type
const initialState: User = {
    userInfo: new UserInfo(),
    isStaff: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        },

        setIsStaff: (state, action: PayloadAction<boolean>) => {
            state.isStaff = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, setIsStaff } = userSlice.actions;

export default userSlice.reducer;
