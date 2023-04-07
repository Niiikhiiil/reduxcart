import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PRODUCT_URL = 'https://dummyjson.com/products';
const CATEGORY_URL = 'https://dummyjson.com/products/categories';

export const fetchProductDetail = createAsyncThunk(
	'product/fetchProductDetail',
	async () => {
		try {
			const res = await axios.get(PRODUCT_URL);
			return res.data;
		} catch (err) {
			console.error(err.message);
		}
	},
);

export const fetchCategory = createAsyncThunk(
	'product/fetchCategory',
	async () => {
		try {
			const res = await axios.get(CATEGORY_URL);
			// console.log(res.data);
			return res.data;
		} catch (err) {
			console.error(err.message);
		}
	},
);
export const selectCategory = createAsyncThunk(
	'product/selectCategory',
	async (cat) => {
		try {
			const res = await axios.get(
				`https://dummyjson.com/products/category/${cat}`,
			);
			// console.log(res.data);
			return res.data;
		} catch (err) {
			console.error(err.message);
		}
	},
);

export const resetProducts = createAsyncThunk(
	'product/resetProducts',
	async () => {
		try {
			const res = await axios.get(PRODUCT_URL);

			return res.data;
		} catch (err) {
			console.error(err.message);
		}
	},
);

export const viewProduct = createAsyncThunk(
	'product/viewProduct',
	async (id) => {
		try {
			const res = await axios.get(PRODUCT_URL + '/' + id);
			return res.data;
		} catch (err) {
			console.error(err.message);
		}
	},
);

export const searchProduct = createAsyncThunk(
	'product/searchProduct',
	async (search) => {
		try {
			const res = await axios.get(
				`https://dummyjson.com/products/search?q=${search}`,
			);
			return res.data;
		} catch (err) {
			console.error(err.message);
		}
	},
);

const productSlice = createSlice({
	name: 'product',
	initialState: {
		product: [],
		isLoading: false,
		search: [],
		filter: [],
		category: [],
		singleProduct: null,
		cart: [],
		total: 0,
	},
	reducers: {
		ADD_TO_CART: (state, action) => {
			let ap = {
				title: action.payload.p.title,
				brand: action.payload.p.brand,
				category: action.payload.p.category,
				description: action.payload.p.description,
				discountPercentage: action.payload.p.discountPercentage,
				id: action.payload.p.id,
				images: action.payload.p.images,
				price: action.payload.p.price,
				rating: action.payload.p.rating,
				email: action.payload.email,
				qty: 1,
				stock: action.payload.p.stock,
			};
			state.cart = [...state.cart, ap];
		},
		REMOVE_FROM_CART: (state, action) => {
			return {
				...state,
				cart: state.cart.filter((c) => c.id !== action.payload.prod.id),
			};
		},
		CHANGE_PROD_QTY: (state, action) => {
			void {
				...state,
				cart: state.cart.map((c) => {
					if (
						c.id === action.payload.id &&
						c.email === action.payload.email
					) {
						return (c.qty = action.payload.qty);
					}
				}),
			};
		},
		TOTAL_AMOUNT: (state, action) => {
			return { ...state, total: action.payload.total };
		},
		EMPTY_CART: (state) => {
			state.cart = [];
			state.total = 0;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProductDetail.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProductDetail.fulfilled, (state, action) => {
				state.isLoading = false;
				void (state.product = action.payload);
			})
			.addCase(fetchProductDetail.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(searchProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(searchProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				// state.search=action.payload;
				void (state.search = [action.payload]);
			})
			.addCase(searchProduct.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(resetProducts.fulfilled, (state, action) => {
				state.search = [];
				state.filter = [];
				state.isLoading = false;
				void (state.product = action.payload);
			})
			.addCase(fetchCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				void (state.category = action.payload);
			})
			.addCase(selectCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				void (state.filter = action.payload);
			})
			.addCase(viewProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				void (state.singleProduct = action.payload);
			});
	},
});

export const {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	CHANGE_PROD_QTY,
	TOTAL_AMOUNT,
	EMPTY_CART,
} = productSlice.actions;
export default productSlice.reducer;
