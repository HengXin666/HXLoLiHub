const fs = require('fs-extra');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');

const sidebar = {
  tutorialSidebar: []
};

function stripPrefix(name) {
  return name.replace(/^\d+[-_]/, ''); // 去掉类似 01- 前缀
}

function scanDocs(dir, relativePath = '') {
  const entries = fs.readdirSync(dir);
  const items = [];
  let hasIndex = false;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const cleanLabel = stripPrefix(entry);
      const folderRelative = path.join(relativePath, entry);
      const result = scanDocs(fullPath, folderRelative);

      const subCategory = {
        type: 'category',
        label: cleanLabel,
        collapsible: true,
        items: result.items,
      };

      if (result.hasIndex) {
        const id = path.posix.join(
          ...folderRelative.split(path.sep).map(stripPrefix),
          'index'
        );
        subCategory.link = {
          type: 'doc',
          id: id.replace(/\\/g, '/')
        };
      }

      items.push(subCategory);
    } else if (entry === 'index.md') {
      hasIndex = true;
    } else if (entry.endsWith('.md')) {
      const id = path.posix.join(
        ...relativePath.split(path.sep).map(stripPrefix),
        stripPrefix(entry.replace(/\.md$/, ''))
      );
      items.push(id);
    }
  }

  return { items, hasIndex };
}

sidebar.tutorialSidebar = scanDocs(docsDir).items;

const sidebarContent = `module.exports = ${JSON.stringify(sidebar, null, 2)};\n`;
fs.outputFileSync(path.join(__dirname, '../sidebars.ts'), sidebarContent);
console.log('✅ sidebars.ts 已自动生成');
