
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './SignIn.css'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useSignInWithEmailAndPassword, useSignInWithGithub, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const SignIn = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [showPassword, setShowPassword] = useState(false)
    const [showBtn, setShowBtn] = useState(true)
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);


    const [signInWithGoogle, user1, loading1, error1] = useSignInWithGoogle(auth);


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const handleShowPassword = () => {
        setShowPassword(true)
        setShowBtn(false)
    }
    const handleHidePassword = () => {
        setShowPassword(false)
        setShowBtn(true)
    }
 
    let signInError;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";


   
    
        if (user || user1) {
            navigate(from, { replace: true });
        }
    

    if (loading || loading1 ) {
        return <p className="pt-20">Loading...</p>
    }

    if(error || error1){
        console.log(error1);
        signInError= <p className='text-red-500'><small>{error?.message || error1?.message }</small></p>
    }

    const onSubmit =async (data) => {
      await  signInWithEmailAndPassword(data.email, data.password);
      const email =data?.email
      console.log(email);
  }
    

    return (
        <div className={`md:relative min-h-screen   md:h-[140vh] md:w-[100%]  bg-cover `}>
            <Toaster></Toaster>
            <div className="w-[100%]  bg-black min-h-screen bg-cover  md:h-[140vh] bg-opacity-50  flex flex-col justify-center items-center">
                <div className="md:w-[30%] w-[100%] bg-black h-screen md:absolute bottom-[35%]  md:h-auto bg-opacity-80 shadow-xl md:mt-28 pt-40 md:py-10  ">
                    <div className="card-body w-[95%] md:w-96 mx-auto my-auto  ">
                        <h2 className="text-center text-white text-4xl mb-6 font-bold">Sign In</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="outline-0 px-2 py-3 w-full max-w-xs rounded bg-[#333] text-white border-b-[red]"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is Required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid Email'
                                        }
                                    })}
                                />

                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-[#e87c03]">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-[#e87c03]">{errors.email.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs my-2">
                                <div className="flex">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        className="outline-0 px-2 py-3 input-bordered w-full max-w-xs rounded-l rounded-r-0 bg-[#333] text-white"
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: 'Password is Required'
                                            },
                                            minLength: {
                                                value: 6,
                                                message: 'Must be 6 characters or longer'
                                            }
                                        })}
                                    />
                                    {
                                        showBtn ?
                                            <div onClick={handleShowPassword} className="bg-[#333] rounded-r text-[grey] py-3 px-2 cursor-pointer">
                                                SHOW
                                            </div>
                                            :
                                            <div onClick={handleHidePassword} className="bg-[#333] rounded-r text-[grey] py-3 px-2 cursor-pointer">
                                                HIDE
                                            </div>
                                    }
                                </div>
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-[#e87c03]">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-[#e87c03]">{errors.password.message}</span>}
                                </label>
                            </div>


                            <input className='px-4 py-3 font-bold rounded w-full max-w-xs text-white bg-[#e50914]  cursor-pointer mt-4 mb-2' type="submit" value="Sign In" />
                        </form>
              
                        <label onClick={() => signInWithGoogle()}  
                            className=" px-4 py-3 font-bold rounded w-full max-w-xs  cursor-pointer mt-4 space-x-2 flex items-center justify-center bg-white ">
                            <img src="https://www.100ms.live/_next/image?url=%2Fassets%2Fhero%2Fgoogle.svg&w=32&q=75" alt="" /> <span className="font-bold">Start with Google</span>
                        </label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SignIn;