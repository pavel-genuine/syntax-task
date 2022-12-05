import { configureStore } from '@reduxjs/toolkit';

import publishPostReducer from './features/postSection/postSlice';
import allPostReducer from './features/postSection/allPostSlice';
import singlePostReducer from './features/postSection/postSlice';
import postDeleteReducer from './features/postSection/postSlice'


export const store = configureStore({
  reducer: {
    publishPost:publishPostReducer,
    allPosts:allPostReducer,
    singlePost:singlePostReducer,
    deletePost:postDeleteReducer,
  },
});
