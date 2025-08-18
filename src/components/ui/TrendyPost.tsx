import formatDate from "@/utils/format-date";
import { NewsCard, NewsCardLandscape } from "./card-news";

const TrendyPost = ({categories, homePage = false}) => {
    return  <section className="grid items-start gap-5 lg:grid-cols-3">
              <div className="lg:col-span-3">
                {categories[0] && (
                  <NewsCardLandscape
                    media={categories?.[0].posts?.[0].featured_image}
                    // media={categories[0].post.featured_media_src_url}
                    title={categories?.[0].posts?.[0].title}
                    path={`/blogs/${categories?.[0].slug}/${categories[0].posts?.[0].slug}`}
                    // path={`/blogs/${categories[0].category.slug}/${trendingPosts[0].post.slug}`}
                  />
                )}
              </div>
    
              {homePage && categories
        ?.filter((category) => category.posts_count > 0).map((post, index) => {
                return <NewsCard
                  key={index}
                  noReadMore
                  media={post?.posts?.[0]?.featured_image as string}
                  title={post?.posts?.[0]?.title as string}
                  // path={`/blogs/${post?.category.slug}/${post?.post.slug}`}
                  path={`/blogs/${post?.slug}/${post?.posts?.[0]?.slug}`}
                  description={post?.posts?.[0]?.excerpt as string}
                  // description={post?.post.excerpt.rendered as string}
                  date={formatDate(post?.posts?.[0]?.published_at as string)}
                />
            })}
              {!homePage && categories
        ?.filter((category) => category.posts_count > 0)?.[0]?.posts.map((post, index) => {
                return <NewsCard
                  key={index}
                  noReadMore
                  media={post?.featured_image as string}
                  title={post?.title as string}
                  // path={`/blogs/${post?.category.slug}/${post?.post.slug}`}
                  path={`/blogs/${categories?.[0]?.slug}/${post?.slug}`}
                  description={post?.posts?.[0]?.excerpt as string}
                  // description={post?.post.excerpt.rendered as string}
                  date={formatDate(post?.posts?.[0]?.published_at as string)}
                />
            })}
            </section>
}

export default TrendyPost;