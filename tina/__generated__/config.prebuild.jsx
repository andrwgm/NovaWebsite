// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.TINA_BRANCH || process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || process.env.CF_PAGES_BRANCH || "test";
var config_default = defineConfig({
  branch,
  clientId: process.env.VITE_TINA_CLIENT_ID || process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    publicFolder: "public",
    outputFolder: "admin"
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog posts",
        path: "content/blog",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            const slug = String(document?.slug || "").trim();
            if (!slug) return void 0;
            return `/blog/${slug}`;
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (URL)",
            description: "SEO-friendly, unique slug (lowercase, hyphens). Must not duplicate another post.",
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Primary category",
            required: true,
            description: "Examples: Autism, ADHD, Combined, Children, Adults, NHS & Updates, General guidance."
          },
          {
            type: "string",
            name: "tags",
            label: "Tags / topics",
            list: true,
            ui: { component: "tags" }
          },
          {
            type: "datetime",
            name: "publishedAt",
            label: "Published date",
            required: true
          },
          {
            type: "datetime",
            name: "updatedAt",
            label: "Updated date"
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover image"
          },
          {
            type: "image",
            name: "ogImage",
            label: "Open Graph image (optional)"
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured on /blog"
          },
          {
            type: "boolean",
            name: "sidebarFeatured",
            label: "Mini highlight in sidebar"
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft (hidden on the website)"
          },
          {
            type: "string",
            name: "seoTitle",
            label: "SEO title override"
          },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO description override",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "canonicalUrl",
            label: "Canonical URL override"
          },
          {
            type: "number",
            name: "readingTime",
            label: "Reading time (minutes, optional)"
          },
          {
            type: "number",
            name: "order",
            label: "Manual ordering boost (optional)"
          },
          {
            type: "number",
            name: "viewCount",
            label: "Displayed views (placeholder until analytics is connected)"
          },
          {
            type: "string",
            name: "relatedPosts",
            label: "Related posts (manual slugs, optional)",
            list: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
