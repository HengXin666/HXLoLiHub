import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import type { Props } from '@theme/MDXComponents/Img';

import styles from './styles.module.css';

/**
 * 提取宽度标记
 * @param altText 
 * @returns 
 */
function extractWidthFromAlt (altText?: string): string | undefined {
    if (!altText) 
        return undefined;

    const match = altText.match(/##w(\d+)(%?)##/); // 匹配 ##w500## 或 ##w75%##
    console.log(match);
    if (match) {
        return match[1] + (match[2].length ? '%' : 'px'); // 返回匹配的宽度部分
    }
    return undefined;
}

function transformImgClassName (className?: string): string {
    return clsx(className);
}

export default function MDXImg (props: Props): ReactNode {
    const {
        alt, // 获取到 ![alt]()
        src, // 获取到 ![alt](src)
    } = props;

    const width = extractWidthFromAlt(alt);

    console.log('w', width);

    return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
            decoding="async"
            loading="lazy"
            {...props}
            style={ width ? {width:  width} : {width: 'auto'} }
        />
    );
}
