import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import wishlistReducer from './slices/wishlistSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    wishlist: wishlistReducer
  }
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch