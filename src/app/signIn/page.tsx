"use client";

import { authApi } from "@/lib/api/auth";
import { Jersey_10 } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

  const jersey10 = Jersey_10({
    weight: "400",
    subsets: ["latin"],
  });

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authApi.login(formData.email, formData.password);
      if (response.message === "success") {
        if(response.data.email === "admin@nevtik.com"){
          router.push("/Admin/AdminTable");
          console.log(response)
        }else{
          router.push("/Voting-Page");
          console.log(response)
        }
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to sign in. Please check your credentials.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='bg-gradient-to-b pt-32 from-red-800 to-red-400 flex justify-center h-screen'>
      <div className='my-10'>
        <Image
          src={"assets/banner.svg"}
          alt='banner'
          width={700}
          height={100}
        />
      </div>
      <div className='w-135 bg-white h-142.5 rounded-tr-4xl rounded-br-4xl justify-center my-14.25'>
        <div className='mt-6 flex items-center justify-center'>
          <Image
            src={"/assets/nevtik1.svg"}
            alt={"logo-nevtik"}
            width={45}
            height={45}
          />
        </div>
        <div className='text-center'>
          <div className={jersey10.className}>
            <h1 className='text-7xl text-red-800 jersey'>Pemilu Nevtik</h1>
          </div>
          <p className='text-red-800 text-xl'>Sign In</p>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-150 sm:max-w-sm'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {error && (
              <div className='p-3 text-sm text-red-600 bg-red-100 rounded-md'>
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-900'
              >
                NIS/NISN
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  placeholder='Enter NIS/NISN'
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className='block w-full rounded-md px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-900'
              >
                Password
              </label>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  placeholder='********'
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className='block w-full rounded-md px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex my-15 w-full justify-center rounded-md bg-red-800 py-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
