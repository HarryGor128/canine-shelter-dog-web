import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface Dog {
    dogBreedsList: string[];
}

// Define the initial state using that type
const initialState: Dog = {
    dogBreedsList: [],
};

export const dogSlice = createSlice({
    name: 'dog',
    initialState,
    reducers: {
        setDogBreedsList: (state, action: PayloadAction<string[]>) => {
            state.dogBreedsList = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setDogBreedsList } = dogSlice.actions;

export default dogSlice.reducer;
