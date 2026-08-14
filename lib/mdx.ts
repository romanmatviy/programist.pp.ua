import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Language } from '@/data/translations';

const postsDirectory = path.join(process.cwd(), 'data', 'posts');

export interface PostMetadata {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updatedAt?: string;
  author: string;
  authorRole: string;
  authorBio: string;
  image: string;
  tags: string[];
  readTime: string;
  relatedPosts?: string[];
}

export interface Post extends PostMetadata {
  content: string;
}

export function getPostSlugs(lang: Language) {
  const langDir = path.join(postsDirectory, lang);
  if (!fs.existsSync(langDir)) return [];
  return fs.readdirSync(langDir);
}

export function getPostBySlug(slug: string, lang: Language): Post | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, lang, `${realSlug}.mdx`);
  
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    updatedAt: data.updatedAt,
    author: data.author,
    authorRole: data.authorRole,
    authorBio: data.authorBio,
    image: data.image,
    tags: data.tags || [],
    readTime: data.readTime,
    relatedPosts: data.relatedPosts,
    id: data.id,
    content,
  };
}

export function getAllPosts(lang: Language): Post[] {
  const slugs = getPostSlugs(lang);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, lang))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
