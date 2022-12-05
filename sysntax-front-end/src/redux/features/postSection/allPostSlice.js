import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllContents} from "../../../api/api";


export const fetchAllllPosts =createAsyncThunk("/posts/fetchAllllPosts",
async()=>{
    const res = await getAllContents();

    // console.log('AllPosts thunk',res?.data);
   
    return res?.data;
})

const allPostsSlice = createSlice({
    name:'posts',
    initialState:{
        isLoading:false,
        posts:[],
        error:null
    },
    extraReducers:(builder) =>{

        builder.addCase(fetchAllllPosts.pending,(state)=>{
            state.isLoading= true
        });
        builder.addCase(fetchAllllPosts.fulfilled,(state, action)=>{
            state.isLoading= false
            state.posts=action.payload
            state.error=null
        });
        builder.addCase(fetchAllllPosts.rejected,(state,action)=>{
            state.isLoading= false
            state.posts= []
            state.error=action.error.message
        })

    }
})

export default allPostsSlice.reducer