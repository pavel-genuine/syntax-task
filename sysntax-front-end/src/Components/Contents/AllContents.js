import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import usePosts from '../Shared/usePosts';
import SingleContent from './SingleContent';

const AllContents = () => {

    const {isLoading, error, posts:contents } =usePosts()

  
    return (

        <div>
            <div className='pt-[5.9%]'>
                <div className='text-center space-x-8 mb-10 '>
                    <div className='bg-slate-50 p-2'>
                        <h2 className="text-4xl mr-16 text-center font-semibold flex justify-center"><span className='text-[brown]'>Syntax</span>Contents</h2>
                        <p className="font-mono mt-4  text-sm">
                            Welcome to the friendliest place for anyone to explore!
                        </p>
                    </div>

                </div>
                <div className='md:grid grid-cols-2 gap-2 w-[90%] mx-auto'>
                    {
                        contents?.map(content => <SingleContent key={content._id} content={content}></SingleContent>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllContents;