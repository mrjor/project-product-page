import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import wishlistReducer from './slices/wishlistSlice';

// Configure the Redux store with the products and wishlist reducers
export const store = configureStore({
  reducer: {
    products: productsReducer,  // Reducer for managing products state
    wishlist: wishlistReducer   // Reducer for managing wishlist state
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself

/**
 * RootState represents the shape of the Redux store's state.
 * It is inferred from the return type of `store.getState()`.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch represents the type of the Redux store's dispatch function.
 * It is inferred from the type of `store.dispatch`.
 */
export type AppDispatch = typeof store.dispatch;
