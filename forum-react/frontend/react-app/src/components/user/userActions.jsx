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
        .then((res) => res.json())
        .then((body) => {
          localStorage.setItem("userToken", body.token);
          return body;
        });
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
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
    console.log(username);
    try {
      let data = await fetch(`${backendURL}/api/v1/auth/register`, {
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
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
