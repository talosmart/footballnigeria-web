'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ApiRequest } from '@/constant/api.config';
import SpinnerLoader from '@/components/SpinnerLoader';
import { useUserStore } from '@/store/userStore';
import useUserData from '@/store/useUserData';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    country: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);

    const router = useRouter()

  const { token, setToken, clearToken } = useUserStore();
  const { user, setUser, clearUser, refreshUser } = useUserData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await ApiRequest('auth/register', 'POST', {
        full_name: formData.full_name,
        email: formData.email,
        phone_number: formData.phone,
        country: formData.country,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      if (res?.response?.access_token) {
        setSuccessMsg('Registration successful')
        setTimeout(() => {
          setSuccessMsg(null)
          setToken(res.response.access_token)
         setUser(res.response.user)
        },4000)
       router.push('/')
      } else {
        setErrorMsg(res?.message || 'Registration failed. Please try again.');
      }
    } catch (error: any) {
      setErrorMsg(error?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = (identifier : string) => {
    if(identifier === 'confirm'){
      setShowPasswordConfirmed((prev) => !prev);
    }else{
      setShowPassword((prev) => !prev);
    }

  }

  return (
    <form
      onSubmit={handleRegister}
      className="w-full max-w-[573px] bg-white px-7 pt-16 pb-9 text-[#4F4F4F] lg:px-10"
      style={{ boxShadow: '0 0 4px 0 #00000040' }}
    >
      <h2 className="mb-7 text-2xl leading-7 font-medium">Create Account</h2>

      <fieldset className="mb-12 grid gap-y-4">
        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="full_name" className="text-[13px] leading-6 font-semibold text-[#1E1E1E]">
            Full Name*
          </label>
          <input
            name="full_name"
            id="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="font-lato border-border-default rounded-lg border bg-white px-3 py-4 text-sm text-[#828282]"
          />
        </div>

        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="email" className="text-[13px] leading-6 font-semibold text-[#1E1E1E]">
            Email Address
          </label>
          <input
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="font-lato border-border-default rounded-lg border bg-white px-3 py-4 text-sm text-[#828282]"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-2">
          <div className="flex flex-col gap-y-0.5">
            <label htmlFor="phone" className="text-[13px] leading-6 font-semibold text-[#1E1E1E]">
              Phone Number
            </label>
            <div className="border-border-default relative flex w-full flex-row-reverse overflow-hidden rounded-lg border bg-white focus-within:outline-2">
              <input
                name="phone"
                id="phone"
                type='number'
                value={formData.phone}
                onChange={handleChange}
                required
                className="font-lato w-full px-3 py-4 text-sm text-[#828282] focus:outline-none"
              />
              <div className="flex h-full shrink-0 items-center gap-x-1 bg-[#F5F5F5] px-2 text-sm">
                <Image src="/flag-sq.svg" alt="" width={18} height={18} />
                +234
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-0.5">
            <label htmlFor="country" className="text-[13px] leading-6 font-semibold text-[#1E1E1E]">
              Country
            </label>
            <div className="relative w-full">
              <select
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="font-lato border-border-default w-full appearance-none rounded-lg border bg-white px-3 py-4 text-sm text-[#828282]"
              >
                <option value="">Select Country</option>
                <option value="Nigeria">Nigeria</option>
                {/* Add more countries if needed */}
              </select>
              <Image
                src="/chevron-black.svg"
                alt=""
                width={11.62}
                height={6.37}
                className="absolute top-1/2 right-3 -translate-y-1/2"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-2">
          <div className="flex flex-col gap-y-0.5">
            <label htmlFor="password" className="text-[13px] leading-6 font-semibold text-[#1E1E1E]">
              New Password
            </label>
            <div className="relative w-full">
              <input
                name="password"
                id="password"
                type={showPassword ? 'text' : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="font-lato border-border-default w-full rounded-lg border bg-white px-3 py-4 text-sm text-[#828282]"
              />
              <Image
              onClick={() => handleShowPassword('')}
                src="/not-visible.svg"
                alt=""
                width={18}
                height={18}
                className="absolute top-1/2 right-3 -translate-y-1/2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-0.5">
            <label htmlFor="confirmPassword" className="text-[13px] leading-6 font-semibold text-[#1E1E1E]">
              Confirm Password
            </label>
            <div className="relative w-full">
              <input
                name="confirmPassword"
                id="confirmPassword"
                type={showPasswordConfirmed ? 'text' : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="font-lato border-border-default w-full rounded-lg border bg-white px-3 py-4 text-sm text-[#828282]"
              />
              <Image
              onClick={() => handleShowPassword('confirm')}
                src="/not-visible.svg"
                alt=""
                width={18}
                height={18}
                className="absolute top-1/2 right-3 -translate-y-1/2"
              />
            </div>
          </div>
        </div>

        {errorMsg && <p className="text-sm text-red-600 font-medium">{errorMsg}</p>}
        {successMsg && <p className="text-sm text-green-600 font-medium">{successMsg}</p>}

        <button
          type="submit"
          className="bg-primary flex items-center justify-center gap-x-2 rounded-full py-3 font-medium text-white cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? <SpinnerLoader /> : 'Create Account'}
          {!isLoading && <Image src="/add-user.svg" alt="" width={24} height={24} />}
        </button>
      </fieldset>

      <p className="text-center text-sm text-[#535353]">
        Already have an account?{' '}
        <Link className="ml-1.5 font-semibold text-[#1E7F48] underline" href="/login">
          LOGIN
        </Link>
      </p>
    </form>
  );
}
