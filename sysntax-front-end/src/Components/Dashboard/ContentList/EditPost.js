import React, { useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import SideBar from '../SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { publishPost, singlePostGet } from '../../../redux/features/postSection/postSlice';
import { createPost } from '../../../api/api';
import { useParams } from 'react-router-dom';


const PublishContent = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { id } = useParams()
    const [coverPhoto, setCoverPhoto] = useState();

    const { isLoading, error, post } = useSelector(state => state?.singlePost)
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)

        dispatch(singlePostGet(id))

    }, [])



    const onChangeCover = (data) => {
        setCoverPhoto(data)
        const image = data[0].file
    }

    const onSubmit = async (data) => {

        const image = coverPhoto[0]?.file

        console.log('img', image);

        console.log('dis', data);


        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "ch77jcb5")
        formData.append("cloud_name", "pavel-genuine")

        console.log('fData', formData);

        const url = `https://api.cloudinary.com/v1_1/pavel-genuine/image/upload`
        fetch(url,
            {
                method: "POST",
                body: formData

            })
            .then(res => res.json())
            .then(async result => {
                console.log('imgbbCover', result)
                const banner = result.url
                const user = 'admin'
                const sendData = { blogger: user, banner, title: data.title, body: data.body, profilePhoto: user }
                console.log('sendData', sendData);

                await fetch(`https://coder-access-backend.onrender.com/blogs`,
                    {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(sendData)
                    })

            })

        toast.success("Information Updated")
    }

    const email = ''
    if (isLoading) {
        <p>loading...</p>
    }

    return (
        <div className='pt-[18.5%] md:pt-0   '>
            <Toaster></Toaster>
            <div className='md:hidden'>
                <SideBar index={4} color={'[#e50914]'} className=''></SideBar>
            </div>
            <div className='mx-auto pt-[16.7%] md:pt-0  md:w-[100%] w-[90%] mx-auto  md:grid grid-cols-12 '>
                <div className='md:block hidden'>
                    <SideBar index={4} color={'[#e50914]'} className=''></SideBar>
                </div>

                <div className='col-span-10  pb-10 mx-auto md:pt-24'>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="text-2xl font-bold mb-5 underline"> Admin Page</h2>
                        <h2 className="text-2xl font-bold ">Publish Content</h2>
                        <div className="flex justify-between my-5 ">
                            <h1 className="text-[brown] font-semibold">{email}</h1>
                            {/* { */}
                            {/* videoUrl ?  */}
                            <button type="submit" className=" btn hover:bg-[#e50914] bg-[brown] btn-xs mb-10 ">
                                Publish
                            </button>
                            {/* :
                         <button disabled type="submit" className="disabled:btn-error  disabled:btn-xs ">
                         Publish
                     </button> */}

                            {/* } */}
                        </div>
                        <div className=''>

                        <div style={{
                                        zIndex: '0', backgroundColor: 'black', backgroundRepeat: 'no-repeat', backgroundAttachment: "",
                                        backgroundImage: `url(${post?.data?.banner})`
                                    }} class='bg-cover absolute border-slate-600 border border-b-0 md:w-[50vw] w-[90vw] h-[180px] md:h-[350px]  md:mx-auto shadow overflow-hidden sm:rounded-t-lg ' >

                                    </div>

                            <div className='flex flex-col'>
                                <div className='md:flex items-center '>
                                    <div className='mr-5'>
                                        <ImageUploading
                                            value={coverPhoto}
                                            onChange={onChangeCover}
                                            dataURLKey="data_url"
                                        >
                                            {({
                                                imageList,
                                                onImageUpload
                                            }) => (

                                                <div className="upload__image-wrapper relative text-black">

                                                    <div class="mt-1 flex justify-center mb-8 mr-2 items-center px-6 pt-5 pb-6 border-2 md:w-[50vw] w-[90vw] h-[180px] md:h-[350px]  border-dashed rounded-md">
                                                        <div class="space-y-1 text-center">
                                                            <div class="flex text-sm text-gray-600">
                                                                <label onClick={onImageUpload} for="file-upload1" class="relative cursor-pointer rounded-md font-bold text-white bg-black p-2 bg-opacity-80 hover:text-[brown] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                                    <svg class="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg><span>Upload Post Photo</span>
                                                                    <input style={{ backgroundColor: ' #919cb1', border: '#6b7280' }} class="sr-only" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        imageList?.map((image, index) => (

                                                            <div style={{
                                                                zIndex: '1', backgroundColor: 'black', backgroundRepeat: 'no-repeat', backgroundAttachment: "",
                                                                backgroundImage: `url(${image?.data_url})`
                                                            }}
                                                                class='bg-cover border-slate-600 border  md:w-[52vw] w-[90vw] h-[180px] md:h-[360px]   md:mx-auto absolute top-[-2%] left-[0%]  shadow overflow-hidden rounded-lg' >

                                                                <div class="px-4 py-5 sm:px-6 mr-2 " >

                                                                    <p title='Change cover' onClick={onImageUpload} className='absolute top-[2%] right-[1%] md:top-[0%] md:right-[1%]  btn btn-xs my-3 '><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    </svg></p>

                                                                </div>
                                                            </div>))
                                                    }

                                                </div>
                                            )}
                                        </ImageUploading>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <div>
                                        <textarea
                                            style={{ fontWeight: 'bolder', fontSize: '20px' }}
                                            placeholder='Title'
                                            defaultValue={post?.data?.title}
                                            className='shadow-sm  border-b-2 py-3 text-2xl font-blod focus:outline-none mt-20   block w-full sm:text-md'
                                            name="" id="" cols="30" rows="1"
                                            {...register("title", {
                                                required: {
                                                    value: true,
                                                    message: 'Title is required'
                                                }
                                            })}>
                                        </textarea>
                                        <label className="label">
                                            {errors?.title?.type === 'required' && <span className="label-text-alt text-[#e87c03]">{errors.title.message}</span>}

                                        </label>
                                    </div>
                                </div>

                                <div className='grow-wrap'>
                                    <textarea
                                        style={{ fontWeight: 'bold', fontSize: '15px' }}
                                        placeholder="Description..."
                                        defaultValue={post?.data?.body}
                                        id="body" name="body" rows="4"
                                        className="shadow-sm border-b-2 focus:outline-none mt-20 pt-12 text-lg block w-full  px-2 "
                                        {...register("body")}>


                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default PublishContent;