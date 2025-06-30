import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <form
      className="w-full max-w-[572px] bg-white px-7 pt-16 pb-9 text-[#4F4F4F] lg:px-10"
      style={{ boxShadow: "0 0 4px 0 #00000040" }}
    >
      <h2 className="mb-7 text-2xl leading-7 font-medium">Reset Password</h2>

      <fieldset className="mb-12 grid gap-y-4">
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

        <button className="bg-primary flex items-center justify-center gap-x-2 rounded-full py-3 font-medium text-white">
          Send Reset Link
          <Image src="/password-reset.svg" alt="" width={24} height={24} />
        </button>
      </fieldset>

      <p className="text-center text-sm text-[#535353]">
        Remembered Password?
        <Link
          className="ml-1.5 font-semibold text-[#1E7F48] underline"
          href="/create-account"
        >
          LOGIN
        </Link>
      </p>
    </form>
    // <SuccessMessageAfterSendingLoginMail />
  );
}

// const SuccessMessageAfterSendingLoginMail = () => {
//   return (
//     <section
//       className="w-full max-w-[572px] bg-white px-7 pt-16 pb-9 text-[#4F4F4F] lg:px-10"
//       style={{ boxShadow: "0 0 4px 0 #00000040" }}
//     >
//       <div className="mb-7">
//         <h2 className="mb-4 text-2xl leading-7 font-medium">Reset Link Sent</h2>

//         <p className="text-sm font-semibold tracking-[0.2px]">
//           We have sent instructions on how to reset your password to
//           <span className="block"> abc@example.com</span>
//         </p>
//       </div>

//       <div className="text-primary mb-7 flex items-center justify-center gap-x-2 py-2">
//         <p>Check Mailbox</p>{" "}
//         <Image src="/message-box.svg" alt="" width={24} height={21.69} />
//       </div>

//       <button className="text-primary flex w-full items-center justify-center gap-x-2 py-3 font-medium">
//         <svg
//           width="25"
//           height="25"
//           viewBox="0 0 25 25"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="rotate-180"
//         >
//           <path
//             d="M4.5 12.2794H7M20.5 12.2794L14.5 6.27942M20.5 12.2794L14.5 18.2794M20.5 12.2794H10"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//         Login Page
//       </button>
//     </section>
//   );
// };
