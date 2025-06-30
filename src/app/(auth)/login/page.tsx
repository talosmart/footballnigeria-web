import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <form
      className="w-full max-w-[572px] bg-white px-4 pt-16 pb-9 text-[#4F4F4F] lg:px-10"
      style={{ boxShadow: "0 0 4px 0 #00000040" }}
    >
      <h2 className="mb-7 text-2xl leading-7 font-medium">
        Login in your account
      </h2>

      <fieldset className="mb-12 grid gap-y-4">
        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="email" className="text-[13px] leading-6">
            Email Address
          </label>
          <input
            name="email"
            id="email"
            className="font-lato border-border-default rounded-lg border bg-white px-3 py-4 text-sm text-[#828282]"
          />
        </div>
        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="password" className="text-[13px] leading-6">
            Password
          </label>
          <div className="relative w-full">
            <input
              name="password"
              id="password"
              className="font-lato border-border-default w-full rounded-lg border bg-white px-3 py-4 text-sm text-[#828282]"
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

        <div className="flex items-center justify-between text-sm font-medium">
          <div className="flex items-center gap-x-2.5">
            <Image src="/checkbox.svg" alt="" width={20} height={20} />
            <span>Remember me</span>
          </div>
          <Link href="/forgot-password" className="text-[#FF3B30]">
            Lost Password?
          </Link>
        </div>

        <button className="bg-primary flex items-center justify-center gap-x-2 rounded-full py-3 font-medium text-white">
          Log In{" "}
          <Image src="/arrow-right-broken.svg" alt="" width={24} height={24} />
        </button>
      </fieldset>

      <p className="text-center text-sm text-[#535353]">
        Don’t have an account?{" "}
        <Link
          className="ml-1.5 font-semibold text-[#1E7F48] underline"
          href="/create-account"
        >
          REGISTER
        </Link>
      </p>
    </form>
  );
}
