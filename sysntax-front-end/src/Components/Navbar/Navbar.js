import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import CustomLink from './CustomLink';

const Navbar = ({ filterHandler, searchHandler }) => {
    const [background, setBackground] = useState(false)

    const changeBackground = () => {

        if (window.scrollY >= 80) {
            setBackground(true)

        } else {
            setBackground(false)

        }
    }


    window.addEventListener('scroll', changeBackground)


    const menuItems =
        <>
            <CustomLink to='/'>All Contents</CustomLink>

            <CustomLink to='/admin/publish-content'>Admin Page</CustomLink>

            <Link to='/sign-in' className='bg-[brown] px-3 font-semibold text-white py-1 rounded'>Log In</Link>

        </>


    return (
        <div >
            <div className={`nav h-[70px]  fixed bg-white ${background ? 'bg-opacity-80' : 'bg-opacity-80 '} backdrop-filter-none backdrop-blur-sm shadow z-100`}>
                <div className="lg:navbar lg:w-[100vw]  mx-auto flex md:justify-around justify-between items-center">
                    <div className="lg:navbar-start hidden md:block">
                        <Link to='/'>
                            <h1 className='font-bold text-[brown] md:ml-20 normal-case text-3xl '>
                                Syntax
                            </h1>
                        </Link>
                    </div>
                    <div className='lg:hidden flex justify-between items-center p-2'>
                        <div className="dropdown">
                            <label htmlFor='menuToggler' tabIndex="0" className="btn btn-ghost ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <input type="checkbox" name="" id="menuToggler" />
                            <Link to='/' className="btn btn-ghost normal-case text-3xl text-[#e50914] font-bold">Jucundu</Link>
                        </div>
                    </div>
                    <div className='space-x-3'>
                        <div className="navbar-cente hidden lg:flex">
                            <ul className="menu menu-horizontal mt-[4%] ml-20 pb-[.6%] space-x-10">
                                {menuItems}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;