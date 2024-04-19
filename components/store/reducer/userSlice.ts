import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import UserInfo from '../../type/UserInfo';

// Define a type for the slice state
interface User {
    userInfo: UserInfo;
}

// Define the initial state using that type
const initialState: User = {
    userInfo: new UserInfo(),
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
