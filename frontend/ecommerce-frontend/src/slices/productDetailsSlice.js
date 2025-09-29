import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://e-commerce-backend-fzf6.onrender.com/api';

// Async thunk for fetching product details
export const listProductDetails = createAsyncThunk(
  'productDetails/listProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Async thunk for creating product review
export const createProductReview = createAsyncThunk(
  'productDetails/createProductReview',
  async ({ productId, review }, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`${API_URL}/products/${productId}/reviews`, review, config);
      return 'Review added successfully';
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: {
    product: { reviews: [] },
    loading: false,
    error: null,
    reviewLoading: false,
    reviewError: null,
    reviewSuccess: false,
  },
  reducers: {
    resetProductReview: (state) => {
      state.reviewLoading = false;
      state.reviewError = null;
      state.reviewSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(listProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProductReview.pending, (state) => {
        state.reviewLoading = true;
      })
      .addCase(createProductReview.fulfilled, (state) => {
        state.reviewLoading = false;
        state.reviewSuccess = true;
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.reviewError = action.payload;
      });
  },
});

export const { resetProductReview } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
