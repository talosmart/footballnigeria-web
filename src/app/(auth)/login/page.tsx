'use client';

import SpinnerLoader from '@/components/SpinnerLoader';
import { ApiRequest } from '@/constant/api.config';
import { useUserStore } from '@/store/userStore';
import useUserData from '@/store/useUserData';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()

    const { token, setToken, clearToken } = useUserStore();
    const { user, setUser, clearUser, refreshUser } = useUserData();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await ApiRequest<{ email: string; password: string }>(
        'login',
        'POST',
        { email, password }
      );

      if (res?.response?.access_token) {
            setToken(res.response.access_token)
       setUser(res.response.user)
       router.push('/')
      } else {
        setErrorMsg(res?.message || 'Login failed. Please try again.');
      }
    } catch (error: any) {
      setErrorMsg(error?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-[572px] bg-white px-4 pt-16 pb-9 text-[#4F4F4F] lg:px-10"
      style={{ boxShadow: '0 0 4px 0 #00000040' }}
    >
      <h2 className="mb-7 text-2xl leading-7 font-medium">Login to your account</h2>

      <fieldset className="mb-12 grid gap-y-4">
        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="email" className="text-[13px] leading-6">Email Address</label>
          <input
            name="email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="font-lato border-border-default rounded-lg border bg-white px-3 py-4 text-sm text-[#828282]"
            required
          />
        </div>
        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="password" className="text-[13px] leading-6">Password</label>
          <div className="relative w-full">
            <input
              name="password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-lato border-border-default w-full rounded-lg border bg-white px-3 py-4 text-sm text-[#828282]"
              required
            />
            <Image
              src="/not-visible.svg"
              alt=""
              width={18}
              height={18}
              className="absolute top-1/2 right-3 -translate-y-1/2"
            />
          </div>
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
        )}

        <div className="flex items-center justify-between text-sm font-medium">
          <div className="flex items-center gap-x-2.5">
            <Image src="/checkbox.svg" alt="" width={20} height={20} />
            <span>Remember me</span>
          </div>
          <Link href="/forgot-password" className="text-[#FF3B30]">
            Lost Password?
          </Link>
        </div>

        <button
          type="submit"
          className="bg-primary flex items-center justify-center gap-x-2 rounded-full py-3 font-medium text-white cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? <SpinnerLoader /> : 'Log In'}
          {!isLoading && (
            <Image
              src="/arrow-right-broken.svg"
              alt=""
              width={24}
              height={24}
            />
          )}
        </button>
      </fieldset>

      <p className="text-center text-sm text-[#535353]">
        Don’t have an account?{' '}
        <Link className="ml-1.5 font-semibold text-[#1E7F48] underline" href="/create-account">
          REGISTER
        </Link>
      </p>
    </form>
  );
}
