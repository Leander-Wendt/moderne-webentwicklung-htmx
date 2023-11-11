import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, createPost } from "./userActions";

const parseJwt = (token) => {
	let base64Url = token.split(".")[1];
	let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	let jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split("")
			.map((c) => {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);

	return JSON.parse(jsonPayload);
};

const initialState = {
	loading: false,
	userInfo: null,
	userToken: null,
	username: null,
	error: null,
	success: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem("userToken");
			state.loading = false;
			state.userInfo = null;
			state.username = null;
			state.userToken = null;
			state.error = null;
		},
		LOCATION_CHANGE: (state) => {
			state.loading = false;
			state.error = null;
			state.success = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.userInfo = payload;
				state.userToken = payload.token;
				state.username = parseJwt(payload.token).sub;
			})
			.addCase(registerUser.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.userInfo = payload;
				state.userToken = payload.token;
				state.username = parseJwt(payload.token).sub;
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			})
			.addCase(createPost.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createPost.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(createPost.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			});
	},
});

export const { logout, LOCATION_CHANGE } = userSlice.actions;
export default userSlice.reducer;
