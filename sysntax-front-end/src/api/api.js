import axios from 'axios';
export const base_url = 'https://coder-access-backend.onrender.com';

export const getAllContents =()=>axios.get(`${base_url}/blogs`)
export const getSingleContent =(id)=>axios.get(`${base_url}/blogs/${id}`)
export const deletePost =(id)=>axios.delete(`${base_url}/blogs/${id}`)
