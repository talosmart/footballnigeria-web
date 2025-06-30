import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <form
      className="w-full max-w-[573px] bg-white px-7 pt-16 pb-9 text-[#4F4F4F] lg:px-10"
      style={{ boxShadow: "0 0 4px 0 #00000040" }}
    >
      <h2 className="mb-7 text-2xl leading-7 font-medium">Create Account</h2>

      <fieldset className="mb-12 grid gap-y-4">
        <div className="flex flex-col gap-y-0.5">
          <label
            htmlFor="email"
            className="text-[13px] leading-6 font-semibold text-[#1E1E1E]"
          >
            Full Name*
          </label>
          <input
            name="email"
            id="email"
            className="font-lato border-border-default rounded-lg border bg-white px-3 py-4 text-sm text-[#828282]"
          />
        </div>
        <div className="flex flex-col gap-y-0.5">
          <label
            htmlFor="email"
            className="text-[13px] leading-6 font-semibold text-[#1E1E1E]"
          >
            Email Address
          </label>
          <input
            name="email"
            id="email"
            className="font-lato border-border-default rounded-lg border bg-white px-3 py-4 text-sm text-[#828282]"
          />
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div className="flex flex-col gap-y-0.5">
            <label
              htmlFor="phone"
              className="text-[13px] leading-6 font-semibold text-[#1E1E1E]"
            >
              Phone Number
            </label>
            <div className="border-border-default relative flex w-full flex-row-reverse overflow-hidden rounded-lg border bg-white focus-within:outline-2">
              <input
                name="phone"
                id="phone"
                className="font-lato w-full px-3 py-4 text-sm text-[#828282] focus:outline-none"
              />
              <div className="flex h-full shrink-0 items-center gap-x-1 bg-[#F5F5F5] px-2 text-sm">
                <Image src="/flag-sq.svg" alt="" width={18} height={18} />
                +234
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-0.5">
            <label
              htmlFor="country"
              className="text-[13px] leading-6 font-semibold text-[#1E1E1E]"
            >
              Country
            </label>
            <div className="relative w-full">
              <select
                name="country"
                id="country"
                className="font-lato border-border-default w-full appearance-none rounded-lg border bg-white px-3 py-4 text-sm text-[#828282]"
              >
                <option value="Nigeria">Select Country</option>
                <option value="Nigeria">Nigeria</option>
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
            <label
              htmlFor="password"
              className="text-[13px] leading-6 font-semibold text-[#1E1E1E]"
            >
              New Password
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
          <div className="flex flex-col gap-y-0.5">
            <label
              htmlFor="password"
              className="text-[13px] leading-6 font-semibold text-[#1E1E1E]"
            >
              Confirm Password
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
        </div>

        <button className="bg-primary flex items-center justify-center gap-x-2 rounded-full py-3 font-medium text-white">
          Create Account{" "}
          <Image src="/add-user.svg" alt="" width={24} height={24} />
        </button>
      </fieldset>

      <p className="text-center text-sm text-[#535353]">
        Already have an account?{" "}
        <Link
          className="ml-1.5 font-semibold text-[#1E7F48] underline"
          href="/login"
        >
          LOGIN
        </Link>
      </p>
    </form>
  );
}
