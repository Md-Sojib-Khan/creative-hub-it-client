import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAxios from '../../Hooks/useAxios';


const Register = () => {
    const { createUser, setUser, updateUser, googleSignInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const axiosInstance = useAxios();

    const errorMessages = {
        'auth/email-already-in-use': 'This email is already registered!',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/weak-password': 'Your password is too weak — use 6+ characters.',
        'auth/network-request-failed': 'Network error. Please check your internet connection.',
        'auth/missing-password': 'Please enter your password.',
        'default': 'Something went wrong. Please try again.'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const from = e.target;

        const name = from.name.value;
        const photoURL = from.photoURL.value;
        const email = from.email.value;
        const password = from.password.value;
        const newUser = { name, email, photoURL, role:'user'}

        const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        if (!regex.test(password)) {
            setError("Password must have at least one uppercase, one lowercase letter, and be at least 6 characters long.");
            return;
        }

        createUser(email, password)
            .then(result => {
                const userData = result.user;
                toast.success('SignUp successfully')
                navigate('/')

                axiosInstance.post('/users', newUser)
                    .then(data => {
                        if (data.data.insertedId) {
                            toast.success('Saved user information')
                        }
                    })

                updateUser({ displayName: name, photoURL: photoURL })
                    .then(() => {
                        setUser({ ...userData, displayName: name, photoURL: photoURL });
                    })
                    .catch((error) => {
                        const message = errorMessages[error.code] || errorMessages.default;
                        toast.error(message);
                    })
            })
            .catch(error => {
                const message = errorMessages[error.code] || errorMessages.default;
                toast.error(message);
            })
    }

    const handleGoogleSignIn = () => {
        googleSignInUser()
            .then((result) => {
                toast.success('Login Successfully')
                navigate('/')

                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    role:'user'
                }

                axiosInstance.post('/users', newUser)
                    .then(data => {
                        if (data.data.insertedId) {
                            toast.success('Saved user information')
                        }
                    })
            })
            .catch(error => {
                const message = errorMessages[error.code] || errorMessages.default;
                toast.error(message);
            })
    }

    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    return (
        <div className="hero bg-base-200 md:min-h-screen pt-28">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-3">
                <h1 class="text-2xl font-semibold text-blue-600 tracking-tight relative flex items-center pl-10">
                    <span className="absolute left-4 w-4 h-4 bg-blue-600 rounded-full"></span>
                    <span className="absolute left-4 w-4 h-4 bg-blue-600 rounded-full animate-ping"></span>
                    Register Now!
                </h1>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="fieldset">
                        <label className="font-medium">Name</label>
                        <input type="text" name='name' className="input" placeholder="Name" required />
                        <label className="font-medium">PhotoURL</label>
                        <input type="text" name='photoURL' className="input" placeholder="PhotoURL" />
                        <label className="font-medium">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" required />
                        <label className="font-medium">Password</label>
                        <div className='relative'>
                            <input type={showPassword ? "text" : "password"} name='password' className="input" placeholder="Password" required />
                            <button onClick={handleShowPassword} type='button' className='cursor-pointer absolute top-3.5 right-8 z-10'>{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</button>
                        </div>
                        <p className='text-xs text-red-500'>{error}</p>
                        <button className="btn btn-neutral mt-4 hover:bg-white hover:text-black border-black">SignUp</button>
                        <div className='mt-3'><div className="font-medium">Already Have An Account ? <Link to={'/login'} className='link link-hover text-red-500'>Login</Link></div></div>
                    </form>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] hover:bg-black hover:text-white">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;