'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  lang: string;
}

export default function TableOfContents({ lang }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const article = document.querySelector('.prose');
    if (!article) return;

    const elements = Array.from(article.querySelectorAll('h2, h3'));
    if (elements.length < 2) return;

    const tocItems: TocItem[] = elements.map((el, idx) => {
      const id = el.id || `heading-${idx}`;
      if (!el.id) el.id = id;
      return {
        id,
        text: el.textContent || '',
        level: parseInt(el.tagName[1]),
      };
    });
    setHeadings(tocItems);
  }, []);

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const title = lang === 'ua' ? 'Зміст статті' : 'Содержание статьи';

  return (
    <nav
      aria-label={title}
      className="mb-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl"
    >
      <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">
        {title}
      </p>
      <ol className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? '1rem' : '0' }}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`text-sm transition-colors duration-150 ${
                activeId === h.id
                  ? 'text-blue-700 font-semibold'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
