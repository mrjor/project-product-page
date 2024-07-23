import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Axios from "axios";
import { Product } from "@/store/types";


// Define the initial state for the products slice
export interface ProductsState {
    collection: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

// Set the initial state for the products slice
const initialState: ProductsState = {
    collection: [],
    status: 'idle',
    error: null
};

// Thunk for fetching all products with optional query parameters
export const fetchProducts = createAsyncThunk<Product[], object>(
  'products/fetchProducts', 
  async (data: object) => {
    const response = await Axios.get('/products', { params: data });
    return response.data as Product[];
  }
);

// Thunk for fetching a product by its ID
export const fetchProductById = createAsyncThunk<Product, number>(
  'products/fetchProduct', 
  async (id: number) => {
    const response = await Axios.get('/products/' + id);
    return response.data as Product;
  }
);

// Thunk for updating a product
export const updateProduct = createAsyncThunk<Product, Product>(
  'products/updateProduct', 
  async (product: Product) => {
    const response = await Axios.put(`/products/${product.id}`, product);
    return response.data as Product;
  }
);

// Thunk for deleting a product by its ID
export const deleteProductById = createAsyncThunk<number, number>(
  'products/deleteProduct', 
  async (productId: number) => {
    await Axios.delete(`/products/${productId}`);
    return productId;
  }
);

// Thunk for creating a new product
export const createProduct = createAsyncThunk<Product, Product>(
  'products/createProduct', 
  async (product: Product) => {
    const response = await Axios.post('/products', product);
    return response.data as Product;
  }
);

// Helper function to set the state when a request is rejected
const setRejectedStateWithMessage = (state: ProductsState, message: string) => {
    state.status = 'failed';
    state.error = message || '';
};

// Helper function to set the state to loading
const setLoadingState = (state: ProductsState) => {
  state.status = 'loading';
};

// Helper function to update or create a product in the collection
const updateOrCreateProductInCollection = (state: ProductsState, action: PayloadAction<Product>) => {
  state.status = 'succeeded';
  const updatedProduct = action.payload;
  const existingProductIndex = state.collection.findIndex(product => product.id === updatedProduct.id);

  if (existingProductIndex >= 0) {
    // Update the existing product
    state.collection[existingProductIndex] = updatedProduct;
  } else {
    // Add the new product to the collection
    state.collection.push(updatedProduct);
  }
}

// Helper function to delete a product from the collection by its ID
const deleteProductByIdFromCollection = (state: ProductsState, action: PayloadAction<number>) => {
  state.status = 'succeeded';
  const productId = action.payload;
  state.collection = state.collection.filter(product => product.id !== productId);
}

// Helper function to set the products collection
const setProductsCollection = (state: ProductsState, action: PayloadAction<Product[]>) => {
  state.status = 'succeeded';
  state.collection = action.payload;
}

// Create slice with typed state and actions
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, setLoadingState)
      .addCase(fetchProducts.fulfilled, setProductsCollection)
      .addCase(fetchProducts.rejected, (state) => {
        setRejectedStateWithMessage(state, 'Failed to fetch products')
      })
      .addCase(updateProduct.pending, setLoadingState)
      .addCase(updateProduct.fulfilled, updateOrCreateProductInCollection)
      .addCase(updateProduct.rejected, (state) => {
        setRejectedStateWithMessage(state, 'Failed to update product')
      })
      .addCase(createProduct.pending, setLoadingState)
      .addCase(createProduct.fulfilled, updateOrCreateProductInCollection)
      .addCase(createProduct.rejected, (state) => {
        setRejectedStateWithMessage(state, 'Failed to create product')
      })
      .addCase(deleteProductById.pending, setLoadingState)
      .addCase(deleteProductById.fulfilled, deleteProductByIdFromCollection)
      .addCase(deleteProductById.rejected, (state) => {
        setRejectedStateWithMessage(state, 'Failed to delete product')
      });
  }
});

// Export the reducer from the products slice
export default productsSlice.reducer;
