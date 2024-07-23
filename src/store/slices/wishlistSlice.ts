import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Axios from "axios";
import { Wishlist } from "@/store/types";


// Define the initial state for the Wishlists slice
interface WishlistsState {
    collection: Wishlist[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

// Set the initial state for the Wishlists slice
const initialState: WishlistsState = {
    collection: [],
    status: 'idle',
    error: null
};

// Thunk for fetching all Wishlists with optional query parameters
export const fetchWishlists = createAsyncThunk<Wishlist[], object>(
  'wishlists/fetchWishlists', 
  async (data: object) => {
    const response = await Axios.get('/wishlists', { params: data });
    return response.data as Wishlist[];
  }
);

// Thunk for fetching a Wishlist by its ID
export const fetchWishlistById = createAsyncThunk<Wishlist, number>(
  'wishlists/fetchWishlist', 
  async (id: number) => {
    const response = await Axios.get('/wishlists/' + id);
    return response.data as Wishlist;
  }
);

// Thunk for updating a Wishlist
export const updateWishlist = createAsyncThunk<Wishlist, Wishlist>(
  'wishlists/updateWishlist', 
  async (wishlist: Wishlist) => {
    const response = await Axios.put(`/wishlists/${wishlist.id}`, wishlist);
    return response.data as Wishlist;
  }
);

// Thunk for deleting a Wishlist by its ID
export const deleteWishlistById = createAsyncThunk<number, number>(
  'wishlists/deleteWishlist', 
  async (wishlistId: number) => {
    await Axios.delete(`/wishlists/${wishlistId}`);
    return wishlistId;
  }
);

// Thunk for creating a new Wishlist
export const createWishlist = createAsyncThunk<Wishlist, Wishlist>(
  'wishlists/createWishlist', 
  async (wishlist: Wishlist) => {
    const response = await Axios.post('/wishlists', wishlist);
    return response.data as Wishlist;
  }
);

// Helper function to set the state when a request is rejected
const setRejectedStateWithMessage = (state: WishlistsState, message: string) => {
    state.status = 'failed';
    state.error = message || '';
};

// Helper function to set the state to loading
const setLoadingState = (state: WishlistsState) => {
  state.status = 'loading';
};

// Helper function to update or create a Wishlist in the collection
const updateOrCreateWishlistInCollection = (state: WishlistsState, action: PayloadAction<Wishlist>) => {
  state.status = 'succeeded';
  const updatedWishlist = action.payload;
  const existingWishlistIndex = state.collection.findIndex((wishlist:Wishlist) => wishlist.id === updatedWishlist.id);

  if (existingWishlistIndex >= 0) {
    // Update the existing Wishlist
    state.collection[existingWishlistIndex] = updatedWishlist;
  } else {
    // Add the new Wishlist to the collection
    state.collection.push(updatedWishlist);
  }
}

// Helper function to delete a Wishlist from the collection by its ID
const deleteWishlistByIdFromCollection = (state: WishlistsState, action: PayloadAction<number>) => {
  state.status = 'succeeded';
  const wishlistId = action.payload;
  state.collection = state.collection.filter(wishlist => wishlist.id !== wishlistId);
}

// Helper function to set the Wishlists collection
const setWishlistsCollection = (state: WishlistsState, action: PayloadAction<Wishlist[]>) => {
  state.status = 'succeeded';
  state.collection = action.payload;
}

// Create slice with typed state and actions
const WishlistsSlice = createSlice({
  name: 'Wishlists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlists.pending, setLoadingState)
      .addCase(fetchWishlists.fulfilled, setWishlistsCollection)
      .addCase(fetchWishlists.rejected, (state) => {
        setRejectedStateWithMessage(state, 'Failed to fetch Wishlists')
      })
      .addCase(updateWishlist.pending, setLoadingState)
      .addCase(updateWishlist.fulfilled, updateOrCreateWishlistInCollection)
      .addCase(updateWishlist.rejected, (state) => {
        setRejectedStateWithMessage(state, 'Failed to update Wishlist')
      })
      .addCase(createWishlist.pending, setLoadingState)
      .addCase(createWishlist.fulfilled, updateOrCreateWishlistInCollection)
      .addCase(createWishlist.rejected, (state) => {
        setRejectedStateWithMessage(state, 'Failed to create Wishlist')
      })
      .addCase(deleteWishlistById.pending, setLoadingState)
      .addCase(deleteWishlistById.fulfilled, deleteWishlistByIdFromCollection)
      .addCase(deleteWishlistById.rejected, (state) => {
        setRejectedStateWithMessage(state, 'Failed to delete Wishlist')
      });
  }
});

// Export the reducer from the Wishlists slice
export default WishlistsSlice.reducer;
