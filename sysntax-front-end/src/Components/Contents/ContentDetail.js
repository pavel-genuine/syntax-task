import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useParams } from 'react-router-dom';
// import auth from '../../firebase.init';
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, TwitterIcon, TwitterShareButton } from 'react-share'
import { base_url } from '../../api/api';
import { singlePostGet } from '../../redux/features/postSection/postSlice';
import SingleContent from './SingleContent';

const ContentDetail = () => {

    const { id } = useParams()
    // const [user] = useAuthState(auth);

    const { isLoading, error, post: blog } = useSelector(state => state?.singlePost)

    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)

        dispatch(singlePostGet(id))

    }, [])

    const splitText = (text, from, to) => [
        text?.slice(0, from),
        text?.slice(from, to),
        text?.slice(to),
    ];

    const [disabled, setDisabled] = useState(false);
    const [highlightSection, setHighlightSection] = useState({
        from: 0,
        to: 0,
    });

    const synth = window.speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(blog?.data?.body);
    utterance.addEventListener("start", () => setDisabled(true));
    utterance.addEventListener("end", () => setDisabled(false));
    utterance.addEventListener("boundary", ({ charIndex, charLength }) => {
        setHighlightSection({ from: charIndex, to: charIndex + charLength });
    });

    const handlePlay = () => {
        if (!synth) {
            console.error("no tts");
            return;
        }

        synth.speak(utterance);
        synth.resume();
    };

    const handlePause = () => {
        synth.pause();
    };
    const [listen, setListen] = useState(false);

    const handleListen = () => {
        setListen(true);
        setPause(false);
    };
    const [pause, setPause] = useState(true);

    const pauseHandler = () => {
        setPause(true);
        setListen(false);
    };

    const HighlightedText = ({ text, from, to }) => {
        const [start, highlight, finish] = splitText(text, from, to);

        return (
            <p>
                {start}
                <span style={{ backgroundColor: "#00ff51ab" }}>{highlight}</span>
                {finish}
            </p>
        );
    };

    return (
        <div className='py-16 relative'>

            <div className='mx-auto  w-[80%] '>

                <div className=' my-6'>
                    <div>

                        <div className='md:flex justify-between'>
                            <h1 className='text-3xl font-semibold text-[brown]'>{blog?.data?.title}</h1>
                            <div className='flex items-center space-x-2'>

                                <FacebookShareButton
                                    url={`https://coder-access.web.app/blog-detail/${blog?._id}`}
                                    quote=''
                                    hashtag=''
                                >
                                    <FacebookIcon className='' size={25} round={true} color={'black'} />
                                </FacebookShareButton>


                                <LinkedinShareButton
                                    url={`https://coder-access.web.app/blog-detail/${blog?._id}`}
                                    quote=''
                                    hashtag=''
                                >
                                    <LinkedinIcon size={25} round={true} color={'black'} />
                                </LinkedinShareButton>
                                <TwitterShareButton
                                    url={`https://coder-access.web.app/blog-detail/${blog?._id}`}
                                    quote=''
                                    hashtag=''
                                >
                                    <TwitterIcon size={25} round={true} color={'black'} />
                                </TwitterShareButton>



                            </div>
                        </div>

                        <div className='grid grid-cols-12 gap-5'>
                            <div class="divider mt-6 col-span-5 h-[3%] bg-[brown]"></div>
                            <div class="divider mt-4 col-span-7"></div>
                        </div>
                        <h1 className='text-xl md:text-4xl mb-8 font-semibold'>
                            {blog?.title}
                        </h1>
                        <img loading='lazy' className='border-2 rounded md:w-[50vw] w-[90vw] h-[180px] md:h-[350px] ' src={blog?.data?.banner} alt="" />

                    </div>

                    <div className="my-4 ">
                        {listen && (
                            <button
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "green",
                                    fontWeight: "bold",
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    handlePause();
                                    pauseHandler();
                                }}
                                className="border-2 md:w-[10%] bg-black border-black hover:bg-slate-700 rounded-full w-28 h-10 flex items-center  space-x-1 py-3 pl-3 pr-2 text-white"
                            >
                                {" "}
                                <span className="font-semibold ">Paush</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </button>
                        )}
                        {pause && (
                            <button
                                style={{
                                    display: "flex",

                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "transparent",
                                    border: "none",
                                    color: "green",
                                    fontWeight: "bold",
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    handleListen();
                                    handlePlay();
                                }}
                                className="border-2 md:w-[10%] border-black bg-black hover:bg-slate-700 rounded-full w-28 h-10 flex items-center  px-3 space-x-2 py-3 text-white"
                            >
                                {" "}
                                <span className="font-semibold ">Listen</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className='text-justify'>
                        <HighlightedText text={blog?.data?.body} {...highlightSection} />
                    </div>
                </div>

            </div>





        </div>
    );
};

export default ContentDetail;