import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface appState {
    isLoading: boolean;
    isLogin: boolean;
    loaderText: string;
}

// Define the initial state using that type
const initialState: appState = {
    isLoading: false,
    isLogin: false,
    loaderText: '',
};

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        openLoader: (state) => {
            state.isLoading = true;
        },

        closeLoader: (state) => {
            state.isLoading = false;
        },

        setLoaderState: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        setLoaderText: (state, action: PayloadAction<string>) => {
            state.loaderText = action.payload;
        },

        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    openLoader,
    closeLoader,
    setLoaderState,
    setLoaderText,
    setIsLogin,
} = appStateSlice.actions;

export default appStateSlice.reducer;
