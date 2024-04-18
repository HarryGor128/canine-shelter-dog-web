import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import User from '../../type/user';

// Define a type for the slice state
interface IUser {
    userInfo: User;
}

// Define the initial state using that type
const initialState: IUser = {
    userInfo: new User(),
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.userInfo = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
