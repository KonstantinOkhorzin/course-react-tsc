import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

import { getAllProducts, deleteProduct, createProduct } from '../../services/products';
import { IProduct, IProductCreationData } from '../../types';

interface InitialState {
  products: IProduct[];
  loading: boolean;
  error: null | string;
}

const initialState: InitialState = {
  products: [],
  loading: false,
  error: null,
};

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: create => ({
    getAllProductsThunk: create.asyncThunk(
      async (_: void, thunkApi) => {
        try {
          return await getAllProducts();
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        pending: state => {
          state.loading = true;
        },
        rejected: (state, { payload }) => {
          if (typeof payload === 'string') {
            state.error = payload;
          }
        },
        fulfilled: (state, action) => {
          state.products = action.payload;
          state.error = null;
        },
        settled: state => {
          state.loading = false;
        },
      }
    ),
    createProductThunk: create.asyncThunk(
      async (data: IProductCreationData, thunkApi) => {
        try {
          return await createProduct(data);
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        pending: state => {
          state.loading = true;
        },
        rejected: (state, { payload }) => {
          if (typeof payload === 'string') {
            state.error = payload;
          }
        },
        fulfilled: (state, action) => {
          state.products.unshift(action.payload);
          state.error = null;
        },
        settled: state => {
          state.loading = false;
        },
      }
    ),
    deleteProductThunk: create.asyncThunk(
      async (id: number, thunkApi) => {
        try {
          return await deleteProduct(id);
        } catch (error) {
          return thunkApi.rejectWithValue(error);
        }
      },
      {
        pending: state => {
          state.loading = true;
        },
        rejected: (state, { payload }) => {
          if (typeof payload === 'string') {
            state.error = payload;
          }
        },
        fulfilled: state => {
          //state.products = state.products.filter(product => product.id !== action.payload); У відповідь прилітає true тому я не можу видалити цей продукт з масиву!
          state.error = null;
        },
        settled: state => {
          state.loading = false;
        },
      }
    ),
  }),
  selectors: {
    selectProducts: state => state,
  },
});

export const { getAllProductsThunk, deleteProductThunk, createProductThunk } = slice.actions;
export const { selectProducts } = slice.selectors;

export default slice.reducer;
