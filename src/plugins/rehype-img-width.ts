import { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import type { Element } from 'hast'

const rehypeImgWidth: Plugin = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'img') {
        const alt = node.properties?.alt as string | undefined
        if (!alt) return

        const match = alt.match(/^(.*)\s+##(\d+(px|%)?)##$/)
        if (match) {
          const [, altText, width] = match
          node.properties = {
            ...node.properties,
            alt: altText.trim(),
            style: `max-width: ${width};`,
          }
        }
      }
    })
  }
}

export default rehypeImgWidth