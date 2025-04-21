import React, { JSX, type ReactNode } from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type { WrapperProps } from '@docusaurus/types';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import HXGiscus from '../../components/Giscus';
import config from '@generated/docusaurus.config';

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper (props: Props): JSX.Element {
    const { isBlogPostPage } = useBlogPost();
    return (
        <>
            <BlogPostItem {...props} />
            {isBlogPostPage && (
                <>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        请作者喝奶茶:
                        <div className="icon-container" style={{ marginLeft: '10px' }}>
                            <img src={`${config.baseUrl}/default-icons/alipay.svg`} alt="Alipay Icon" className="icon" />
                            <img src={`${config.baseUrl}/img/alipay_qr_code.png`} alt="QR Code" className="qr-code" />
                        </div>
                        <div className="icon-container" style={{ marginLeft: '10px' }}>
                            <img src={`${config.baseUrl}/default-icons/wechat.svg`} alt="Alipay Icon" className="icon" />
                            <img src={`${config.baseUrl}/img/wechat_qr_code.png`} alt="QR Code" className="qr-code" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <p style={{ fontSize: '12px' }}>本文遵循 <img src={`${config.baseUrl}/default-icons/cc.svg`} alt="CC" style={{ width: '14px' }} /> <a href='https://creativecommons.org/licenses/by-sa/4.0/'>CC 4.0 BY-SA</a> 版权协议, 转载请标明出处</p>
                    </div>
                    <HXGiscus />
                </>
            )}
        </>
    );
}