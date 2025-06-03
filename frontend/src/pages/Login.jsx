import React, { useState } from 'react';

const Login = () => {
  const [state, setState] = useState('SignUp');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // You can handle your login/signup logic here
    console.log({ name, email, password, state });
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg bg-white'>
        <p className='text-2xl font-semibold'>
          {state === 'SignUp' ? 'Create Account' : 'Login'}
        </p>
        <p>Please {state === 'SignUp' ? 'create account' : 'login'} to book appointment</p>

        {state === 'SignUp' && (
          <div className='w-full'>
            <p className='mb-1'>Full Name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder='Enter your full name'
              className='w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400'
            />
          </div>
        )}

        <div className='w-full'>
          <p className='mb-1'>Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder='Enter your email'
            className='w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400'
          />
        </div>

        <div className='w-full'>
          <p className='mb-1'>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder='Enter your password'
            className='w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400'
          />
        </div>

        <button
          type="submit"
          className='w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded'
        >
          {state === 'SignUp' ? 'Create Account' : 'Login'}
        </button>

        <p className='mt-3 text-sm'>
          {state === 'SignUp' ? 'Already have an account?' : "Don't have an account?"}
          <span
            onClick={() => setState(state === 'SignUp' ? 'Login' : 'SignUp')}
            className='ml-2 text-blue-500 cursor-pointer underline hover:text-blue-700'
          >
            {state === 'SignUp' ? 'Login' : 'Create Account'}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
