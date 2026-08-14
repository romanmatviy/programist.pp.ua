const fs = require('fs');
const path = require('path');

let tsContent = fs.readFileSync(path.join(__dirname, '../data/blogPosts.ts'), 'utf8');
tsContent = tsContent.replace('export const blogPosts =', 'module.exports =');
fs.writeFileSync(path.join(__dirname, '../data/blogPosts.js'), tsContent);

const posts = require('../data/blogPosts.js');

posts.forEach(post => {
  ['ua', 'ru'].forEach(lang => {
    let readTime = post.readTime;
    if (readTime.includes(' ')) {
        readTime = readTime.split(' ')[0];
    }
    const mdxContent = `---
id: ${post.id}
title: ${JSON.stringify(post.title[lang])}
excerpt: ${JSON.stringify(post.excerpt[lang])}
date: "${post.date}"
updatedAt: "${post.updatedAt}"
author: "${post.author}"
authorRole: "${post.authorRole}"
authorBio: ${JSON.stringify(post.authorBio)}
image: "${post.image}"
tags: ${JSON.stringify(post.tags)}
readTime: "${readTime}"
relatedPosts: ${JSON.stringify(post.relatedPosts || [])}
---

${post.content[lang]}
`;
    fs.writeFileSync(path.join(__dirname, `../data/posts/${lang}/${post.slug}.mdx`), mdxContent);
  });
});

fs.unlinkSync(path.join(__dirname, '../data/blogPosts.js'));
console.log('Migration complete');
