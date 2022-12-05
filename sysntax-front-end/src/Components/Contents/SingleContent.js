import axios from 'axios';
import React, { useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import AllBlogs from './AllContents';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { base_url } from '../../api/api';


const SingleContent = ({ content}) => {

    return (
        <div className='w-[90%] mx-auto bg-slate-50 p-4 rounded-lg'>
            <div>
                <article className="">
                    <Link to={`/content-detail/${content?._id}`}>
                        <div className='cursor-pointer flex  flex-col md:flex-row md:items-center md:space-x-6 ml-5 md:ml-0'>

                            <img loading='lazy' src={content?.banner} alt="" className="flex-none w-24 border-2  rounded-md bg-slate-100" />
                            <div className="min-w-0 relative flex-auto">

                                <h2 className="font-semibold text-slate-900 truncate hover:text-[brown]"> {content?.title}</h2>
                                <p>
                                    {content?.body.slice(0, 200)}...
                                </p>

                            </div>
                        </div>
                    </Link>

                </article >
            </div >

        </div >
    );
};

export default SingleContent;