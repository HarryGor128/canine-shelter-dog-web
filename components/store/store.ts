import { configureStore } from '@reduxjs/toolkit';

import appStateSlice from './reducer/appStateSlice';
import userSlice from './reducer/userSlice';

export const store = configureStore({
    reducer: {
        appState: appStateSlice,
        user: userSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
