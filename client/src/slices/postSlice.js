import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../config/axiosInstance";
import { redirect } from "react-router";
import Swal from "sweetalert2";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts(state, { payload }) {
      state.posts = payload;
    },
  },
});

// named export
export const { setPosts } = postSlice.actions;

export const fetchPosts = () => async (dispatch) => {
  try {
    const { data } = await instance({
      method: "GET",
      url: "/post",
      headers: {
        "Authorization": `Bearer ${localStorage.access_token}`
    }
    });

    dispatch(setPosts(data));

  } catch (error) {
    Swal.fire({
        icon: "error",
        text: error.response.data.message
    })
  }
};

// export const addMovie = createAsyncThunk("movie/addMovie", async (newMovie) => {
//   const { data } = await instance({
//     method: "POST",
//     url: "/movies",
//     data: newMovie,
//   });

//   return data;
// });

// export const addMovie = (newMovie) => async (dispatch) => {
//   try {
// const { data } = await instance({
//   method: "POST",
//   url: "/movies",
//   data: newMovie
// })
//   } catch(err) {
//     console.log(err)
//   }
// }

export default postSlice.reducer;
