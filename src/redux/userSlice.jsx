import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		users: [
			{
				name: 'xyz',
				surname: 'qwe',
				email: 'xyz@gmail.com',
				password: 1234,
				mobile: 1234568798,
				orderList: [],
				address:
					'34 Crossroads Merrill Road, Lucedale,ms, 39452  United States',
			},
		],
	},
	reducers: {
		LOG_IN: (state, action) => {
			state.users.map((f) => {
				if (f.email === action.payload.email) {
					localStorage.setItem('email', action.payload.email);
				}
			});
		},
		LOG_OUT: () => {
			localStorage.removeItem('email');
		},
		SIGN_UP: (state, action) => {
			let signupU = {
				name: action.payload.name,
				surname: action.payload.surname,
				email: action.payload.email,
				password: action.payload.password,
				mobile: action.payload.mobile,
				orderList: [],
			};
			void (state.users = [...state.users, signupU]);
		},
		BUY_ALL: (state, action) => {
			let o = {
				orderId: action.payload.orderId,
				orderedDate: action.payload.date,
				orders: action.payload.cart,
				total: action.payload.total,
			};
			void {
				...state,
				users: state.users.map((u) => {
					if (u.email === action.payload.email) {
						u.orderList = [...u.orderList, o];
					}
				}),
			};
		},
	},
});

export const { LOG_IN, SIGN_UP, LOG_OUT, BUY_ALL } = userSlice.actions;
export default userSlice.reducer;
