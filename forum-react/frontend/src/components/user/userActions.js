import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://127.0.0.1:8080";

export const registerUser = createAsyncThunk(
	"auth/register",
	async ({ username, displayname, password }, { rejectWithValue }) => {
		try {
			let data = await fetch(`${backendURL}/auth/register`, {
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
					} else if (res.ok) {
						return res.json();
					}
					throw new Error("An error occured.");
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
			let data = await fetch(`${backendURL}/auth/login`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					credentials: "include",
				},
				body: JSON.stringify({ username, password }),
			})
				.then((res) => {
					if (res.ok) {
						res.json();
					} else {
						throw new Error("Request failed.");
					}
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
