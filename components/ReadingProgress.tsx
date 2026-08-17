'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Find the article element (the main content area for the blog post)
      const article = document.querySelector('.prose');
      if (!article) return;

      // Get the bounding rectangle of the article relative to the viewport
      const rect = article.getBoundingClientRect();
      const articleHeight = rect.height;
      
      // Calculate how much of the article has been scrolled past
      // rect.top is the distance from the top of the viewport to the top of the article
      // When rect.top is 0, the top of the article is at the top of the viewport.
      // We want to track progress based on the user scrolling through the article.
      
      const windowHeight = window.innerHeight;
      
      // Calculate the total scrollable distance within the article
      const totalScrollable = articleHeight - windowHeight;
      
      if (totalScrollable <= 0) {
        setProgress(100);
        return;
      }

      // If the top of the article is below the top of the viewport, progress is 0
      if (rect.top > windowHeight / 2) {
        setProgress(0);
        return;
      }

      // Distance scrolled past the start of the article
      const scrolled = -rect.top + (windowHeight / 2);
      
      let newProgress = (scrolled / articleHeight) * 100;
      
      // Clamp between 0 and 100
      newProgress = Math.max(0, Math.min(100, newProgress));
      
      setProgress(newProgress);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial check

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200">
      <div 
        className="h-full bg-primary-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
