const fs = require('fs');
 // wait, glob might not be installed

const files = ['index.css', 'courses.css', 'course-details.css', 'contact-new.css', 'register-new.css'];

const target = `body {
    font-family: var(--font-family);
    background: url('background.png') no-repeat center center fixed;
    background-size: cover;
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
}

body::before {
    content: '';
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(15, 20, 25, 0.60);
    z-index: 0;
    pointer-events: none;
}`;

const replacement = `body {
    font-family: var(--font-family);
    background: #7e8186;
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
}`;

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf-8');
        // fallback regex if exact match fails due to line endings
        const bgRegex = /body\s*\{[^}]*background:\s*url\('background\.png'\)[^}]*\}/;
        const beforeRegex = /body::before\s*\{[^}]*\}/;
        
        content = content.replace(bgRegex, `body {\n    font-family: var(--font-family);\n    background: #7e8186;\n    color: var(--text-primary);\n    line-height: 1.6;\n    overflow-x: hidden;\n    position: relative;\n}`);
        
        content = content.replace(beforeRegex, '');
        
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
