import React, { useState, useReducer } from "react";
import createDataContext from "./createDataContext";
//const BlogContext = React.createContext();
const blogReducer = (state, action) => {
  switch (action.type) {
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: `Blog Post #${state.length + 1}`,
        },
      ];
    case "delete_post":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    default:
      return state;
  }
};
const addBlogPost = (dispatch) => {
  return () => {
    dispatch({ type: "add_blogpost" });
  };
};
const deleteBlogPost = (dispatch) => {
  return id => {
    dispatch({ type: "delete_post", payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost },
  []
);
