import Image from "next/image";
import Link from "next/link";

export const NewsCardLandscape = ({
  media,
  title,
  path,
}: {
  media: string;
  title: string;
  path: string;
}) => {
  return (
    <article
      className={`$flex-row flex rounded-lg bg-white p-1 lg:items-center`}
      style={{ boxShadow: "0 1px 7.7px 0 #00000026" }}
    >
      <div
        className={`relative w-1/2 shrink-0 overflow-hidden rounded-lg lg:min-h-[349px]`}
      >
        <Image src={media} alt="news image" fill className="z-0 object-cover" />
        <div className="absolute top-0 left-0 z-10 h-full w-full bg-radial from-[#00000000] to-[#00875150]" />
      </div>
      <section className={`font-lato p-2.5 lg:p-6`}>
        <span
          className={`from-primary mb-4 inline-block bg-gradient-to-b to-[#007345] px-1 py-0.5 text-xs font-medium text-[#f3f3f3]`}
        >
          NPL
        </span>
        <h3
          className={`border-l-border-secondary border-l-[3px] pl-2.5 text-sm font-bold lg:mb-12 lg:text-2xl`}
        >
          {title}
        </h3>
        <Link
          href={path}
          className={`text-neutral text-[13.75px]" : mt-4 flex items-center gap-x-2 py-2 text-sm leading-6 lg:text-base`}
        >
          Read More
          <Image src="/dashed-arrow.svg" alt="" width={15.71} height={11.78} />
        </Link>
      </section>
    </article>
  );
};

export const NewsCard = ({
  video,
  media,
  title,
  description,
  date,
  path,
  noReadMore,
}: {
  media: string;
  title: string;
  path: string;
  description?: string;
  date?: string;
  noReadMore?: boolean;
  video?: boolean;
}) => {
  return (
    <article
      className="font-lato relative flex items-center overflow-hidden rounded-lg bg-white p-1 lg:flex-col"
      style={{ boxShadow: "0 1px 7.7px 0 #00000026" }}
    >
      <div className="relative h-full min-h-[6.25rem] w-1/2 overflow-hidden rounded-t-lg rounded-l-lg rounded-tr-none lg:h-[220px] lg:w-full lg:rounded-tr-lg lg:rounded-bl-none">
        <Image
          src={media || "/story-image.png"}
          alt={`${title} featured photo`}
          fill
          className="object-cover"
        />
        {video && (
          <button className="absolute bottom-0 left-0 z-50 flex gap-x-2.5 bg-[#ED0423] px-1.5 py-1">
            <Image
              src="/play.svg"
              alt=""
              width={20}
              height={20}
              className="shrink-0"
            />
            <span className="text-lato font-medium text-[#F3F3F3]">00:18</span>
          </button>
        )}
      </div>
      <section className="grid w-1/2 gap-y-3.5 px-3.5 py-4 lg:w-full">
        <h3 className="text-xs font-semibold lg:text-base lg:leading-5">
          {title.length > 16 ? `${title.substring(0, 45)}...` : title}

          <Link href={path} className="absolute inset-0 h-full w-full" />
        </h3>

        {description && (
          <div
            className="text-[10px] leading-4 text-neutral-200 lg:text-sm"
            dangerouslySetInnerHTML={{
              __html:
                title.length > 16
                  ? `${description.substring(0, 90)}...`
                  : title,
            }}
          />
        )}

        <div className="flex items-center justify-between">
          {date && (
            <p className="text-text-secondary border-border-default inline-block border-t py-1.5 pr-2 text-[10px] lg:text-sm">
              21 Jan 2025
            </p>
          )}

          {path && !noReadMore && (
            <Link
              href={path}
              className={`text-primary border-border-default font-lato flex items-center gap-x-2 border-t py-1.5 text-[13.75px] leading-6 font-medium`}
            >
              Read More
            </Link>
          )}
        </div>
      </section>
    </article>
  );
};
