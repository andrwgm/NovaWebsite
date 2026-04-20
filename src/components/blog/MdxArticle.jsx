import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

export default function MdxArticle({ markdown }) {
  return (
    <div className="blog-prose">
      <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={{
        img: ({ alt, src, ...props }) => (
          <span className="blog-prose__figure">
            <img alt={alt || ''} src={src} loading="lazy" decoding="async" {...props} />
          </span>
        ),
        a: ({ children, href, ...props }) => (
          <a href={href} rel="noopener noreferrer" target={href?.startsWith('http') ? '_blank' : undefined} {...props}>
            {children}
          </a>
        )
      }}
    >
      {markdown}
    </ReactMarkdown>
    </div>
  )
}
