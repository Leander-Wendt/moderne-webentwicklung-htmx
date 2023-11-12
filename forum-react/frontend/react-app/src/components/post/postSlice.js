import { createSlice } from "@reduxjs/toolkit";
import { createPost, getPosts } from "./postActions";

const initialState = {
	loading: false,
	error: null,
	success: false,
	posts: [],
};

const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		resetPostState: (state) => {
			state.loading = false;
			state.error = null;
			state.success = false;
			state.posts = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createPost.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createPost.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.posts = state.posts.push(payload);
			})
			.addCase(createPost.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			})
			.addCase(getPosts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getPosts.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.posts = payload;
			})
			.addCase(getPosts.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			});
	},
});

export const { resetPostState } = postSlice.actions;
export default postSlice.reducer;
