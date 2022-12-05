import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllContents } from "../../../api/api";
import { postDelete } from "../../../redux/features/postSection/postSlice";

import SideBar from "../SideBar";

const ContentList = () => {

    const [postsNumber, setPostsNumber] = useState(0)
    const [pageCount, setPageCount] = useState(1)
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState()

    const { post } = useSelector(state => state?.deletePost)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await getAllContents()
            setPosts(data)
            setPostsNumber(() => posts?.length)
        }

        fetchPost()

        setPageCount(() => Math.ceil(postsNumber / 20))

    }, [])

    const handleDeleteOne = (id) => {
        const confirmation = window.confirm('Are you sure to delete?');
        if (confirmation) {
            dispatch(postDelete(id))
            const newposts = posts?.filter(item => item?._id != id);
            setPosts(()=>newposts)

            console.log(newposts,'new');
            console.log(posts,'new p');
        }
    }

    return (
        <div className='py-16 min-h-screen relative'>

            <div className='mx-auto w-[100%] pt-[.7%] md:grid grid-cols-12  '>
                <SideBar index={2} color={'[#e50914]'}></SideBar>
                <div className=" lg:ml-10 col-span-10 w-[100%] px-[5%] mt-10  md:w-[100%]">

                    <div class="space-y-4 ">
                        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                        <div className=''>
                            <p className='font-semibold my-2 text-2xl underline underline-offset-2 my-5 '> Admin Page</p>
                            <p className='font-semibold my-2 text-xl underline underline-offset-2 '> Content List</p>

                            <p className='font-semibold my-5 bg-slate-100 px-3 py-2 md:mr-20 text-lg md:w-96 '>Total Content : {posts?.length} </p>
                            <div style={{ overflowX: 'auto' }}>
                                <table class="shadow-lg table-auto overflow-x-scroll overflow-auto w-full mt-5">
                                    <thead className='text-white'>
                                        <tr className='bg-[brown]'>
                                            <th class=" border border-[#181818] text-left px-8 py-4">Content Title</th>
                                            <th class=" border border-[#181818] text-left px-2 py-4">Tumbnail</th>
                                            <th class=" border border-[#181818] text-left px-8 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-slate-50'>
                                        {posts?.length > 0 &&

                                            posts?.map(post => {
                                                return <tr key={post?._id}>
                                                    <td class="border border-[#181818] px-5 py-2">{post?.title}</td>
                                                    <td class="border border-[#181818] ">
                                                        <img className="w-36 h-24" src={post?.banner} alt="" />
                                                    </td>
                                                    
                                                    <td class="border border-[#181818] px-5 py-2 ">
                                                        <p className='flex'>
                                                            <span title='edit' >
                                                                <Link to={`/admin/edit-content/${post?._id}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-10 cursor-pointer text-[blue]">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                </svg>
                                                                </Link>
                                                            </span>

                                                            <span onClick={() => handleDeleteOne(post?._id)} title='remove'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer text-[red]">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </span>
                                                        </p>

                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center my-10 mx-auto">
                        {
                            // [...Array(pageCount).keys()].map(number => <button onClick={() => setPage(number + 1)} className={`btn btn-sm mx-2 text-center border ${page == number + 1 ? 'bg-[brown]' : ''}`}>{number + 1}</button>)
                        }
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ContentList;