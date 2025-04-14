import type { Plugin } from 'unified';
import type { Root, Image, HTML } from 'mdast';
import { visit } from 'unist-util-visit';
/**
 * 解析形如：![描述 ##w300##](url)
 * 转换为 mdast 中的 html 节点：<img src="..." alt="..." style="max-width:...;" />
 * 不依赖 rehype-attr，直接构造 html 节点注入。
 */

const remarkImageWidth: Plugin<[], Root> = () => {
    return (tree) => {
      visit(tree, 'image', (node, index, parent) => {
        const imageNode = node as Image;
        const alt = imageNode.alt || '';
  
        const match = alt.match(/^(.*?)\s*##w(\d+(px|%|em|rem)?)##\s*$/);
        if (!match || !parent || typeof index !== 'number') return;
  
        const [, cleanAlt, width] = match;
        const imgHTML = `<img src="${imageNode.url}" alt="${cleanAlt.trim()}" style="max-width:${width};" />`;
  
        const htmlNode: HTML = {
          type: 'html',
          value: imgHTML,
        };
  
        parent.children.splice(index, 1, htmlNode);
      });
    };
  };

export default remarkImageWidth;