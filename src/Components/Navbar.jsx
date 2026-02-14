import React, { useContext } from "react";
import logo from '../assets/logo-creative-hub.png'
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import userImg from '../assets/user.png'
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const handleSignOut = () => {
    logOutUser()
      .then(() => toast.success('Sign-out successful'))
      .catch(e => toast(e.code))
  }
  return (
    <div className="navbar bg-white rounded-4xl px-4 md:px-10 absolute top-2 md:top-5  md:left-15 md:w-11/12 z-50">
      {/* Left */}
      <div className="flex-1">
        <a>
          <img className="h-14 w-24" src={logo} alt="" />
        </a>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li><NavLink to={'/about'}>About</NavLink></li>
          <li><NavLink to={'/services'}>Services</NavLink></li>
          <li><NavLink to={'/projects'}>Projects</NavLink></li>
          <li><a>Team</a></li>
          <li><NavLink to={'/contact-us'}>Contact</NavLink></li>
        </ul>
      </div>

      {/* Button */}
      <div className="hidden md:block md:mr-4">
        <button className="btn bg-[#1651A9] text-white hover:bg-[#0f3e82] rounded-full">
          Get A Quote →
        </button>
      </div>
      <div>
        {
          user
            ? <div className="dropdown dropdown-end dropdown-hover cursor-pointer">
              <div tabIndex={0} role="button" >
                <img className='w-10 h-10 object-cover rounded-full border-2 border-white' src={user?.photoURL ? user?.photoURL : userImg} alt="" />
              </div>
              <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-20 w-52 p-2 shadow-sm space-y-2">
                <li><Link to={'/dashboard'} className='font-medium'>Dashboard</Link></li>
                <li><button onClick={handleSignOut} className="btn bg-[#1651A9] text-white hover:bg-[#0f3e82] rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border-0 font-medium">LogOut</button></li>
              </ul>
            </div>

            : <div className='flex items-center gap-2'>
              <Link to={'/login'} className="btn bg-[#1651A9] text-white hover:bg-[#0f3e82] rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border-0 font-medium">Login</Link>
              <Link to={'/register'} className="btn  bg-[#1651A9] text-white hover:bg-[#0f3e82] rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg border-0 font-medium hidden md:inline-flex">Register</Link>
            </div>
        }
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost">
          ☰
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li><NavLink to={'/about'}>About</NavLink></li>
          <li><NavLink to={'/services'}>Services</NavLink></li>
          <li><NavLink to={'/projects'}>Projects</NavLink></li>
          <li><a>Team</a></li>
          <li><NavLink to={'/contact-us'}>Contact</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;