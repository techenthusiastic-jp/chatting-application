import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BiUserCircle } from "react-icons/bi";

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;
    try {
      const response = await axios.post(URL, data, { withCredentials: true });
      toast.success(response.data.message);
      if (response.data.success) {
        setData({
          email: "",
        });
        navigate('/password', {
          state: response?.data?.data,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <div className='w-fit mx-auto mb-2'>
          <BiUserCircle size={80} />
        </div>
        <h3>Welcome to chat App</h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email">E-mail :</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='enter your email'
              className='bg-slate-100 px-2 py-1 focus:bg-primary'
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <button
            className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-3 font-bold text-white leading leading-relaxed tracking-wider'>
            Let's Go
          </button>
        </form>

        <p className='my-3 text-center'>New User ? <Link to="/register" className='hover:text-primary hover:underline'>Register</Link></p>
      </div>
    </div>
  );
};

export default CheckEmailPage;