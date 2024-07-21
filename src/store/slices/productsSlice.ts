import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import Axios from "axios";

interface Product {
    id: number,
    name: string,
    brand: string,
    category: string,
    image: string,
    specifications: object
};
  
interface ProductsState {
    collection: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

// Initial state with type
const initialState: ProductsState = {
    collection: [],
    status: 'idle',
    error: null
};

// Async thunk with return type
export const fetchProducts = createAsyncThunk<Product[], object>
('products/fetchProducts', async (data:object) => {
  const response = await Axios.get('/products', {params:data});
  return response.data as Product[];
});

// Create slice with typed state and actions
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Define any synchronous actions if necessary
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.collection = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

// Export actions and reducer
export default productsSlice.reducer;