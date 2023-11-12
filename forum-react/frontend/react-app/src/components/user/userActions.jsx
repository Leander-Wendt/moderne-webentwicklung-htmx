import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://127.0.0.1:8080";

export const registerUser = createAsyncThunk(
	"auth/register",
	async ({ username, displayname, password }, { rejectWithValue }) => {
		try {
			let data = await fetch(`${backendURL}/api/v1/auth/register`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					credentials: "include",
				},
				body: JSON.stringify({ username, displayname, password }),
			})
				.then((res) => {
					if (res.status === 409) {
						throw new Error("Username is already taken.");
					}
					res.json();
				})
				.then((body) => {
					localStorage.setItem("userToken", body.token);
					return body;
				});
			return data;
		} catch (error) {
			if (error.response?.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const loginUser = createAsyncThunk(
	"auth/login",
	async ({ username, password }, { rejectWithValue }) => {
		try {
			let data = await fetch(`${backendURL}/api/v1/auth/login`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					credentials: "include",
				},
				body: JSON.stringify({ username, password }),
			})
				.then((res) => res.json())
				.then((body) => {
					localStorage.setItem("userToken", body.token);
					return body;
				});
			return data;
		} catch (error) {
			if (error.response?.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const createPost = createAsyncThunk(
	"post/create",
	async ({ title, body, userToken }, { rejectWithValue }) => {
		try {
			await fetch(`${backendURL}/posts`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${userToken}`
				},
				body: JSON.stringify({
					"title": title,
					"body": body,
					"created_at": Date.now(),
					"updated_at": Date.now(),
				}),
			})
				.then((res) => {
					console.log(res)
					if (!res.ok){
						throw new Error("Something went wrong")
					}
				})
		} catch (error) {
			if (error.response?.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
