import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  getSingleContent,} from "../../../api/api";

//
export const publishPost =createAsyncThunk("/post/publishPost",
async(post)=>{
    // const res = await createPost(post);
    // console.log('publishPost thunk',res?.data);
    // return res?.data;
})
//
// export const allPosts =createAsyncThunk("/post/getAllPosts",
// async()=>{
//     const res = await getAllPosts();
//     console.log('getAllPosts thunk',res?.data);
//     return res?.data;
// })
//
export const singlePostGet =createAsyncThunk("/post/singlePost",
async(id)=>{
    const res = await getSingleContent(id);
    // console.log('getSinglePost thunk',res?.data);
    return res?.data;
})
//
export const postDelete =createAsyncThunk("/post/postDelete",
async(id)=>{
    // const res = await deletePost(id);
    // console.log('deletePost thunk',res?.data);
    // return res?.data;
})



const postSlice = createSlice({
    name:'post',
    initialState:{
        isLoading:false,
        post:[],
        error:null
    },
    extraReducers:(builder) =>{

        //post
        builder.addCase(publishPost.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(publishPost.fulfilled,(state, action)=>{
            state.isLoading= false
            state.post=action.payload
            state.error=null
        });
        builder.addCase(publishPost.rejected,(state,action)=>{
            state.isLoading= false
            state.post= []
            state.error=action.error.message
        })

        
        // builder.addCase(allPosts.pending,(state)=>{
        //     state.isLoading= true
        // });
        // builder.addCase(allPosts.fulfilled,(state, action)=>{
        //     state.isLoading= false
        //     state.post=action.payload
        //     state.error=null
        // });
        // builder.addCase(allPosts.rejected,(state,action)=>{
        //     state.isLoading= false
        //     state.post= []
        //     state.error=action.error.message
        // })
        
        
        builder.addCase(singlePostGet.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(singlePostGet.fulfilled,(state, action)=>{
            state.isLoading= false
            state.post=action.payload
            state.error=null
        });
        builder.addCase(singlePostGet.rejected,(state,action)=>{
            state.isLoading= false
            state.post= []
            state.error=action.error.message
        })

        // delete
        builder.addCase(postDelete.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(postDelete.fulfilled,(state, action)=>{
            state.isLoading= false
            state.post=action.payload
            state.error=null
        });
        builder.addCase(postDelete.rejected,(state,action)=>{
            state.isLoading= false
            state.post= []
            state.error=action.error.message
        })
    }
})

export default postSlice.reducer