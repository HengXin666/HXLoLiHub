import React, { type ReactNode } from 'react';
import type { Props } from '@theme/MDXComponents/Img';

import config from '@generated/docusaurus.config';

import { FaEdit } from 'react-icons/fa'; // 引入勾选、还原、复制图标
import './leetcode.css';

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

    const width = extractWidthFromAlt(alt);
    const borderRadius = extractRadiusFromAlt(alt);

    // 注意由于混淆, 它 .drawio.svg 会变为 `${hash()}.svg`
    if (!src.endsWith('.svg')) {

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

    const handleButtonClick = (src: string) => {
        window.open(`${config.baseUrl}drawio?src=${src}`, '_blank');
    };

    return (
        <div style={{
            width: '100%', height: 'auto',
            marginTop: '20px', marginBottom: '20px'
        }}>
            <div className="leetcode_tabs" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                {/* 左侧部分 */}
                <div
                    style={{ display: 'flex', alignItems: 'center' }}
                    className='leetcode-vscode-title'
                >
                    draw.io
                </div>

                {/* 右侧按钮部分 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <button
                        onClick={() => handleButtonClick(src)}
                        className="leetcode_tabs tabs__item"
                    >
                        <FaEdit
                            style={{
                                marginRight: '5px',
                                animation: 'checkmark 0.5s ease-in-out', // 动画效果
                            }}
                        />
                        编辑
                    </button>
                </div>
            </div>
            <div className='leetcode-tabs-content'>
                <img
                    decoding="async"
                    loading="lazy"
                    {...props}
                    style={{
                        width: width ? width : 'auto',
                        borderRadius: borderRadius ? `${borderRadius}px` : 0,
                    }}
                />
            </div>
        </div>
    );
}
