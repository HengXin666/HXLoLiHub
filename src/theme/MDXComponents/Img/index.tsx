import React, { type ReactNode } from 'react';
import type { Props } from '@theme/MDXComponents/Img';

import { useHistory } from 'react-router-dom';
import config from '@generated/docusaurus.config';

/**
 * 提取宽度标记
 * @param altText 
 * @returns 
 */
function extractWidthFromAlt (altText?: string): string | undefined {
    if (!altText) 
        return undefined;
    const match = altText.match(/##[w|W](\d+)(%?)##/); // 匹配 ##w500## 或 ##w75%##
    if (match) {
        return match[1] + (match[2].length ? '%' : 'px'); // 返回匹配的宽度部分
    }
    return undefined;
}

/**
 * 提取圆角标记
 * @param altText 
 * @returns 
 */
function extractRadiusFromAlt (altText?: string): string | undefined {
    if (!altText) 
        return undefined;
    const match = altText.match(/##[r|R](\d+)##/); // 匹配 ##r5##
    if (match) {
        return match[1]; // 返回匹配的宽度部分
    }
    return undefined;
}

export default function MDXImg (props: Props): ReactNode {
    const {
        alt,      // 获取到 ![alt]()
        src = '', // 获取到 ![alt](src)
    } = props;

    // 注意由于混淆, 它 .drawio.svg 会变为 `${hash()}.svg`
    if (!src.endsWith('.drawio') && !src.endsWith('.svg')) {
        const width = extractWidthFromAlt(alt);
        const borderRadius = extractRadiusFromAlt(alt);

        return (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
                decoding="async"
                loading="lazy"
                {...props}
                style={{
                    width: width ? width : 'auto',
                    borderRadius: borderRadius ? `${borderRadius}px` : 0,
                }}
            />
        );
    }

    const history = useHistory();

    const handleButtonClick = (src: string) => {
        history.push(`${config.baseUrl}drawio?src=${src}`);
    };

    return (<button onClick={() => handleButtonClick(src)}>按钮 {`${config.baseUrl}drawio?src=${src}`}</button>);
}
