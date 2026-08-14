const fs = require('fs');
const path = require('path');

function fixCodeBlocks(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace <pre><code class="language-xxx">...</code></pre> with markdown code blocks
    content = content.replace(/<pre><code class="language-([a-zA-Z0-9-]+)">([\s\S]*?)<\/code><\/pre>/g, (match, lang, code) => {
        return '\n```' + lang + '\n' + code.trim() + '\n```\n';
    });
    
    // In MDX, { and } outside of code blocks are treated as JSX expressions.
    // If there are raw { or } in HTML paragraphs (like in code snippets not wrapped in <pre>), 
    // it will throw "Could not parse expression with acorn".
    // We can escape { as {'{'} and } as {'}'} ONLY outside of markdown code blocks.
    
    // A simpler approach for the migrated posts is to replace { with &#123; and } with &#125;
    // but only inside inline <code> tags, or generally in the text, except inside frontmatter and standard markdown code blocks.
    
    let parts = content.split('---');
    if (parts.length >= 3) {
        let frontmatter = parts[1];
        let body = parts.slice(2).join('---');
        
        // Escape { and } in body, BUT NOT inside ``` code blocks
        body = body.replace(/```[\s\S]*?```/g, match => {
            return match; // keep code blocks as is
        });
        
        // Actually, replacing all { and } in the rest of the body with &#123; and &#125;
        // Let's do a split by ``` and only replace in non-code parts
        let blocks = body.split('```');
        for (let i = 0; i < blocks.length; i++) {
            if (i % 2 === 0) {
                // Not inside code block
                blocks[i] = blocks[i].replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
            }
        }
        body = blocks.join('```');
        
        content = '---' + frontmatter + '---' + body;
    }

    fs.writeFileSync(filePath, content);
}

const dirs = [
    path.join(__dirname, '../data/posts/ua'), 
    path.join(__dirname, '../data/posts/ru')
];

dirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
            if (file.endsWith('.mdx')) {
                fixCodeBlocks(path.join(dir, file));
            }
        });
    }
});
console.log('Fixed code blocks and braces');
