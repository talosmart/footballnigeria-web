import Image from "next/image";
import ShareStoryForm from "@/components/form/share-story";
import SubTitle from "@/components/ui/subtitle";

export default function HistoricalRecords() {
  return (
    <main className="mx-auto grid w-full max-w-[1076px] gap-y-10 px-2.5 pt-5 pb-5 lg:pt-12 lg:pb-[6.25rem]">
      <section className="relative h-[241px] overflow-hidden rounded-2xl bg-blend-overlay lg:h-[457px]">
        <Image
          src="/play.svg"
          alt=""
          width={65}
          height={65}
          className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute top-0 left-0 z-40 h-full w-full bg-[#00000033]" />
        <Image src="/naija-flag.jpg" alt="" fill className="object-cover" />
      </section>

      <section>
        <SubTitle title="Latest Fan Diaries" />
        <div className="mt-2.5 mb-5 grid gap-5 lg:mt-10 lg:grid-cols-3">
          {/* <NewsCard video noReadMore />
          <NewsCard video noReadMore />
          <NewsCard video noReadMore />
          <NewsCard video noReadMore />
          <NewsCard video noReadMore />
          <NewsCard video noReadMore />
          <NewsCard video noReadMore />
          <NewsCard video noReadMore />
          <NewsCard video noReadMore /> */}
        </div>
        <div className="flex justify-end">
          <button className="font-lato border-text-secondary flex items-center gap-x-3 rounded-full border px-8 py-2">
            Next
            <Image
              src="/arrow-black.svg"
              alt=""
              width={12}
              height={12}
              className="inline"
            />
          </button>
        </div>
      </section>

      <ShareStoryForm />
    </main>
  );
}
