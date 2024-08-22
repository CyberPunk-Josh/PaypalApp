import React, { useEffect } from 'react'
import Swal from 'sweetalert2';
import {paypalApi} from '../api';
import { useAuthStore } from '../hooks/useAuthStore';
import { useForm } from '../hooks/useForm';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}


export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore();

    const {loginEmail, loginPassword, onInputChange:onLoginInputChange} = useForm(loginFormFields)

    const loginSubmit = async (e) => {
        e.preventDefault();
        startLogin({email: loginEmail, password: loginPassword});
    };

    useEffect(() => {
      if (errorMessage != undefined) {
        Swal.fire('Error en la autenticacion', errorMessage, 'error');
      }
    }, [errorMessage])
    

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className='my-4 font-mono text-2xl'>Login</h1>
        <form onSubmit={loginSubmit} className='border-2 border-r-8 p-10'>
            <div className='mt-10 grid grid-cols-1'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>Email</label>
                <div className='mt-2'>
                    <div className='flex rounded-md shadow-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                        <input 
                            type="text"
                            name='loginEmail'
                            value={loginEmail}
                            placeholder='Enter your email address'
                            autoComplete='off'
                            onChange={onLoginInputChange}
                            className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900'
                        />
                    </div>
                </div>
            </div>
            <div className='mt-10 grid grid-cols-1'>
                <label className='block text-sm font-medium leading-6 text-gray-900'>Password</label>
                <div className='mt-2'>
                    <div className='flex rounded-md shadow-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                        <input 
                            type="password"
                            name='loginPassword'
                            value={loginPassword}
                            placeholder='Enter your password'
                            autoComplete='off'
                            onChange={onLoginInputChange}
                            className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900'
                        />
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
                <button 
                    type="button" 
                    className="text-sm font-semibold leading-6 text-white bg-red-600 px-3 py-2 rounded-md hover:bg-red-700">
                        Cancel
                </button>
                <button 
                    type="submit" 
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Login
                </button>
            </div>
        </form>
    </div>
  )
}
