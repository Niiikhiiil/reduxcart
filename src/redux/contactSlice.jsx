import { createSlice } from '@reduxjs/toolkit';

const contactSlice = createSlice({
	name: 'contact',
	initialState: {
		contact: [],
	},
	reducers: {
		CONTACT_SEND: (state, action) => {
			let c = {
				emailId: action.payload.email,
				currentUserEmail: action.payload.currentUserEmail,
				text: action.payload.text,
			};
			state.contact = [...state.contact, c];
		},
	},
});

export const { CONTACT_SEND } = contactSlice.actions;
export default contactSlice.reducer;
