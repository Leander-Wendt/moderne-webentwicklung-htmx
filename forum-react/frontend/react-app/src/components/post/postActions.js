import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://127.0.0.1:8080";

export const getPosts = createAsyncThunk(
  "post/get",
  async ({}, { rejectWithValue }) => {
    try {
      const data = await fetch(`${backendURL}/public/posts`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error");
        }
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
      let data = await fetch(`${backendURL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          title: title,
          body: body,
          created_at: Date.now(),
          updated_at: Date.now(),
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.text());
        }
        return res.json();
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

export const editPost = createAsyncThunk(
  "post/edit",
  async (
    { id, title, body, userToken, created_at, author },
    { rejectWithValue }
  ) => {
    console.log(id, title, body, userToken, created_at);
    try {
      let data = await fetch(`${backendURL}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          title: title,
          body: body,
          created_at: created_at,
          updated_at: Date.now(),
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.text());
        }
        window.location.reload();
        return res.json();
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
