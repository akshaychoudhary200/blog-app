import React, { useState, useReducer } from "react";
import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";
//const BlogContext = React.createContext();
const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    /*case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
      */
    case "delete_post":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "edit_post":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
        /* if (blogPost.id === action.payload.id) {
          return action.payload;
        } else {
          return blogPost;
        } */
      });
    default:
      return state;
  }
};

const getBlogPost = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post("/blogposts", { title, content });
    // using post method to create so dispatch not needed here
    // index screen will fetch whole data any way so dispatch for new item not needed
    // when on index screen current state will be the elements in the db so dispatch not needed
    //dispatch({ type: "add_blogpost", payload: { title, content } });
    callback();
  };
};
const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_post", payload: id });
  };
};
const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
    dispatch({
      type: "edit_post",
      payload: { id, title, content },
    });
    callback();
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPost },
  []
);
