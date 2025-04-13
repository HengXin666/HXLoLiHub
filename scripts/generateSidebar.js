const fs = require('fs-extra');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');

const sidebar = {
  tutorialSidebar: []
};

function stripNumberPrefix(name) {
  // 去除例如 "01-开发笔记" 的前缀
  return name.replace(/^\d+-/, '');
}

function scanDocs(dir, categoryLabel) {
  const files = fs.readdirSync(dir);

  const items = files.map(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const label = stripNumberPrefix(file);
      const newCategoryLabel = categoryLabel ? `${categoryLabel}/${label}` : label;
      const subItems = scanDocs(filePath, newCategoryLabel);

      if (subItems.length > 0) {
        return {
          type: 'category',
          label: label,
          collapsible: true,
          items: subItems
        };
      }
    } else if (file.endsWith('.md')) {
      const idPath = path
        .join(categoryLabel, file.replace('.md', ''))
        .replace(/\\/g, '/');
      return idPath;
    }
  }).filter(Boolean);

  return items;
}

sidebar.tutorialSidebar = scanDocs(docsDir, '');

const sidebarContent = `module.exports = ${JSON.stringify(sidebar, null, 2)};`;

fs.outputFileSync(path.join(__dirname, '../sidebars.ts'), sidebarContent);

console.log('✅ sidebars.ts 已自动生成');
