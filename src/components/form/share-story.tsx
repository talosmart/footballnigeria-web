import Image from "next/image";

export default function ShareStoryForm() {
  return (
    <section className="font-lato rounded-xl bg-white px-3.5 py-5 lg:p-10">
      <h2 className="mb-6 text-2xl font-bold">Share Your Experience</h2>

      <form className="grid gap-y-5">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="title" className="font-bold text-[#333333]">
            Story Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter your title story here"
            className="font-lato text-text-tertiary rounded-lg border border-[#E6E9EC] px-6 py-4"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="story" className="font-bold text-[#333333]">
            Your Story
          </label>
          <textarea
            name="story"
            id="story"
            placeholder="Write your story here"
            className="font-lato text-text-tertiary h-[209px] resize-none rounded-lg border border-[#E6E9EC] px-6 py-4"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="file" className="font-bold text-[#333333]">
            Upload Image
          </label>
          <label
            htmlFor="file"
            className="flex items-center justify-between rounded-lg border border-[#E6E9EC] py-2 pr-2 pl-6 text-[#333333]"
          >
            <input type="file" className="hidden" id="file" />
            <span>Choose file</span>
            <span className="flex items-center gap-x-2.5 rounded-lg bg-[#E6E6E6] px-5 py-2.5">
              Choose file{" "}
              <Image src="/upload.svg" alt="" width={12} height={14.5} />
            </span>
          </label>
        </div>

        <p className="leading-[16.58px] text-black">
          All submissions will be reviewed before publication.
        </p>

        <button
          type="submit"
          className="font-bai-jamjuree bg-primary w-fit rounded-full px-14 py-3 text-sm font-bold text-[#f3f3f3] lg:py-3.5"
        >
          Submit Story
        </button>
      </form>
    </section>
  );
}
