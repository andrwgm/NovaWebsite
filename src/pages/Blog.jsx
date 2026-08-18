import React, { useEffect, useMemo, useState } from 'react'
import { BLOG_LIST_PAGE_SIZE, SITE_ORIGIN } from '../blog/blogConfig'
import { computeTopicCounts } from '../blog/blogStats'
import { getFeaturedPost, getSidebarFeaturedPost } from '../blog/featured'
import { getFeedPosts } from '../blog/feed'
import { filterPostsByCategory, filterPostsBySearch, getAllPosts } from '../blog/loadPosts'
import BlogCategoryFilters from '../components/blog/BlogCategoryFilters'
import BlogFeaturedCard from '../components/blog/BlogFeaturedCard'
import BlogHero from '../components/blog/BlogHero'
import BlogPostRowCard from '../components/blog/BlogPostRowCard'
import BlogSeo from '../components/blog/BlogSeo'
import BlogSidebar from '../components/blog/BlogSidebar'
import '../components/blog/blog.css'

export default function Blog() {
  const [filterId, setFilterId] = useState('all')
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(
    import.meta.env.SSR === true ? Number.MAX_SAFE_INTEGER : BLOG_LIST_PAGE_SIZE
  )

  const allPosts = useMemo(() => getAllPosts(), [])
  const featured = useMemo(() => getFeaturedPost(allPosts), [allPosts])
  const sidebarMini = useMemo(() => getSidebarFeaturedPost(allPosts, featured), [allPosts, featured])
  const popularTopics = useMemo(() => computeTopicCounts(allPosts), [allPosts])

  const universe = useMemo(() => {
    const byCategory = filterPostsByCategory(allPosts, filterId)
    return filterPostsBySearch(byCategory, query)
  }, [allPosts, filterId, query])

  const showFeaturedCard = Boolean(featured && universe.some((candidate) => candidate.slug === featured.slug))

  const filtered = useMemo(() => {
    const feed = getFeedPosts(allPosts, showFeaturedCard ? featured : null, sidebarMini)
    const byCategory = filterPostsByCategory(feed, filterId)
    return filterPostsBySearch(byCategory, query)
  }, [allPosts, featured, sidebarMini, filterId, query, showFeaturedCard])

  useEffect(() => {
    setVisibleCount(BLOG_LIST_PAGE_SIZE)
  }, [filterId, query])

  const visiblePosts = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount])
  const canLoadMore = visibleCount < filtered.length

  return (
    <div className="blog-page">
      <BlogSeo
        title="Blog | Nova Clinics"
        description="Editorial guidance on autism, ADHD, assessments, and neurodivergent-affirming support—written by Nova Clinics."
        canonicalUrl={`${SITE_ORIGIN}/blog`}
        ogImage={featured?.coverImage}
        ogType="website"
      />

      <BlogHero query={query} onQueryChange={setQuery} />

      <div className="blog-container">
        <BlogCategoryFilters activeId={filterId} onChange={setFilterId} />

        <BlogFeaturedCard post={showFeaturedCard ? featured : null} />

        <div className="blog-layout">
          <div className="blog-layout__main">
            {visiblePosts.length ? (
              <div className="blog-feed" aria-label="Articles">
                {visiblePosts.map((post) => (
                  <BlogPostRowCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="blog-empty" role="status">
                No articles match your filters yet. Try clearing search or choosing &quot;All&quot;.
              </p>
            )}

            {canLoadMore ? (
              <div className="blog-load-more">
                <button
                  type="button"
                  className="blog-button blog-button--ghost"
                  onClick={() => setVisibleCount((count) => count + BLOG_LIST_PAGE_SIZE)}
                >
                  Load more
                </button>
              </div>
            ) : null}
          </div>

          <BlogSidebar popularTopics={popularTopics} miniPost={sidebarMini} />
        </div>
      </div>
    </div>
  )
}
