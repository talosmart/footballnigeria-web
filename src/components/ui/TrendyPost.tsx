import formatDate from "@/utils/format-date";
import { NewsCard, NewsCardLandscape } from "./card-news";
import MoreButton from "./MoreButton";

// Define types for posts and categories
interface Post {
  featured_image?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  published_at?: string;
}

interface Category {
  name: string;
  slug: string;
  posts_count: number;
  posts?: Post[];
}

interface TrendyPostProps {
  categories?: Category[];
  homePage?: boolean;
  news?: boolean;
}

const TrendyPost: React.FC<TrendyPostProps> = ({ categories = [], homePage = false, news = false }) => {
  const newsData = news
    ? categories?.filter((c) => c.posts_count > 0)?.[0]?.posts
    : categories?.filter((c) => c.posts_count > 0)?.[0]?.posts?.slice(0, 2);

  const category = categories?.[0];

  return (
      <>
      
    <section className="grid items-start gap-5 lg:grid-cols-3">
    
      {/* Landscape Card */}
      <div className="lg:col-span-3">
        {categories?.[0] && (
          <NewsCardLandscape
            media={categories[0].posts?.[0]?.featured_image}
            title={categories[0].posts?.[0]?.title}
            path={`/blogs/${categories[0].slug}/${categories[0].posts?.[0]?.slug}`}
          />
        )}
      </div>

      {/* Home Page Version */}
      {homePage &&
        categories
          ?.filter((category) => category.posts_count > 0)
          .map((post, index) => (
            <NewsCard
              key={index}
              noReadMore
              media={post?.posts?.[0]?.featured_image ?? ""}
              title={post?.posts?.[0]?.title ?? ""}
              path={`/blogs/${post?.slug}/${post?.posts?.[0]?.slug}`}
              description={post?.posts?.[0]?.excerpt ?? ""}
              date={formatDate(post?.posts?.[0]?.published_at ?? "")}
            />
          ))}

      {/* Non-home version */}
      {!homePage &&
        newsData?.map((post, index) => (
          <NewsCard
            key={index}
            noReadMore
            media={post?.featured_image ?? ""}
            title={post?.title ?? ""}
            path={`/blogs/${categories?.[0]?.slug}/${post?.slug}`}
            description={post?.excerpt ?? ""}
            date={formatDate(post?.published_at ?? "")}
          />
        ))}

     
    </section>
     {/* More button */}
     <div className="my-5">

      {!homePage && !news && category && (
        <MoreButton
          path={`/football/${category.name.replace(/\s+/g, "-")}/news`}
          title={`More ${category.name} news`}
        />
      )}
     </div>
      </>
  );
};

export default TrendyPost;
