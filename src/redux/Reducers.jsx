import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
	d: [],
};

export const start = createAction('start');

const reducerr = createReducer(initialState, (builder) => {
	builder.addCase(start, (state, action) => {
		state.d = [...state.d,action.payload];
	});
});

export default reducerr;
