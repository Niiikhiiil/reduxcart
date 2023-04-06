import { configureStore } from '@reduxjs/toolkit';

import productReducer from './productSlice';
import useReducers from './userSlice';
import contactReducers from './contactSlice';

export default configureStore({
	reducer: {
		product: productReducer,
		user: useReducers,
		contact: contactReducers,
	},
});
