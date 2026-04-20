import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { resolvePostCanonicalUrl } from '../blog/canonical'
import { getRelatedPosts } from '../blog/relatedPosts'
import { getAllPosts, getPostBySlug } from '../blog/loadPosts'
import { extractTocFromMarkdown } from '../blog/toc'
import { getSidebarFeaturedPost } from '../blog/featured'
import BlogBottomCta from '../components/blog/BlogBottomCta'
import BlogBreadcrumbs from '../components/blog/BlogBreadcrumbs'
import BlogJsonLd, { buildArticleJsonLd } from '../components/blog/BlogJsonLd'
import { BlogPostSidebar } from '../components/blog/BlogSidebar'
import BlogSeo from '../components/blog/BlogSeo'
import BlogTableOfContents from '../components/blog/BlogTableOfContents'
import MdxArticle from '../components/blog/MdxArticle'
import NotFound from './NotFound'
import { formatBlogDate } from '../utils/formatBlogDate'
import '../components/blog/blog.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = useMemo(() => getPostBySlug(String(slug || '')), [slug])

  const allPosts = useMemo(() => getAllPosts(), [])
  const related = useMemo(() => (post ? getRelatedPosts(post, allPosts, 2) : []), [post, allPosts])
  const sidebarMini = useMemo(() => (post ? getSidebarFeaturedPost(allPosts, post) : null), [post, allPosts])
  const tocItems = useMemo(() => (post ? extractTocFromMarkdown(post.body) : []), [post])

  if (!post) {
    return <NotFound />
  }

  const pageTitle = post.seoTitle?.trim() || `${post.title} | Nova Clinics blog`
  const pageDescription = post.seoDescription?.trim() || post.excerpt
  const canonicalUrl = resolvePostCanonicalUrl(post)
  const shareImage = post.ogImage?.trim() || post.coverImage

  const crumbs = [
    { label: 'Blog', to: '/blog' },
    { label: post.category, to: undefined },
    { label: post.title, to: undefined }
  ]

  return (
    <div className="blog-post-page">
      <BlogSeo title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} ogImage={shareImage} />
      <BlogJsonLd schema={buildArticleJsonLd(post, canonicalUrl)} />

      <div className="blog-container blog-container--post">
        <BlogBreadcrumbs items={crumbs} />

        <header className="blog-post-header">
          <div className="blog-post-header__meta">
            <Link className="blog-post-header__category" to="/blog">
              {post.category}
            </Link>
            <span className="blog-post-header__sep" aria-hidden="true">
              |
            </span>
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            <span className="blog-post-header__sep" aria-hidden="true">
              |
            </span>
            <span>Written by {post.author}</span>
            <span className="blog-post-header__sep" aria-hidden="true">
              |
            </span>
            <span>{post.readingTime} min read</span>
            {post.updatedAt ? (
              <>
                <span className="blog-post-header__sep" aria-hidden="true">
                  |
                </span>
                <span>
                  Updated <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time>
                </span>
              </>
            ) : null}
          </div>
          <h1 className="blog-post-header__title">{post.title}</h1>
        </header>

        <figure className="blog-post-cover">
          <img src={post.coverImage} alt={`Cover image for ${post.title}`} loading="lazy" decoding="async" />
        </figure>

        <div className="blog-post-layout">
          <div className="blog-post-layout__reading">
            <details className="blog-toc-mobile">
              <summary>Table of contents</summary>
              <BlogTableOfContents items={tocItems} />
            </details>

            <div className="blog-post-reading">
              <aside className="blog-toc-desktop" aria-label="Table of contents">
                <BlogTableOfContents items={tocItems} />
              </aside>

              <article className="blog-article" lang="en-GB">
                <MdxArticle markdown={post.body} />
              </article>
            </div>
          </div>

          <BlogPostSidebar miniPost={sidebarMini} relatedPosts={related} />
        </div>

        <BlogBottomCta />
      </div>
    </div>
  )
}
