import React from 'react';
import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import config from '@generated/docusaurus.config';

// 模块卡片组件
function FeatureCard ({
    title, description, icon, link
}: {
    title: string;
    description: string;
    icon: ReactNode;
    link: string;
}) {
    return (
        <Link 
            className="col col--3" 
            style={{
                margin: '20px',
                padding: '20px',
                backgroundClip: '#202126',
                borderColor: '#990099',
                borderWidth: '1.2px',
                borderStyle: 'solid',
                borderRadius: '25px',
                textDecoration: 'none',
            }}
            to={link}
        >
            <div>{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </Link>
    );
}

function HomepageHeader () {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '40px 0',
                marginLeft: '100px',
                marginRight: '100px',
            }}
        >
            <div className="container" style={{ flex: 1, textAlign: 'center' }}>
                <Heading as="h1" className="hero__title" style={{ color: '#8CFF00' }}>
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle" style={{ color: '#A9A9A9' }}>
                    {siteConfig.tagline}
                </p>
                <div>
                    <Link
                        className="button button--lg"
                        style={{
                            backgroundColor: '#FFDC33',
                            color: 'black',
                            borderRadius: '8px',
                        }}
                        to="/docs"
                    >
                        快速开始教程
                    </Link>
                </div>
            </div>
            <div className="image-container" style={{ flex: 1 }}>
                <img
                    src={`${config.baseUrl}/img/main_menu_misaka.png`}
                    alt="Image"
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
        </header>
    );
}

export default function Home (): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`欢迎来到 ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <HomepageHeader />
            <main>
                <div className="container">
                    <div className="row">
                        {/* 功能模块卡片 */}
                        <FeatureCard
                            title="Github Page一键部署"
                            description="无需自建服务器, 可以一键部署到Github Page上."
                            icon={<i className="fas fa-cogs" />}
                            link="/docs/docker"
                        />
                        <FeatureCard
                            title="以编辑预览"
                            description="支持网页端工作台编辑.drawio.svg文件, 方便预览, 而不是仅放大图片."
                            icon={<i className="fas fa-image" />}
                            link="/docs/images"
                        />
                        <FeatureCard
                            title="支持编辑代码块"
                            description="内嵌VsCode同款编辑器, 在网页端可以编辑代码. 而不是仅复制. 支持一键还原到原本文本."
                            icon={<i className="fas fa-tasks" />}
                            link="/docs/todo"
                        />
                        <FeatureCard
                            title="高度自定义"
                            description="基于 Docusaurus 魔改, 您可以方便在此基础上二次自定义."
                            icon={<i className="fas fa-users" />}
                            link="/docs/multi-user"
                        />
                        <FeatureCard
                            title="版本管理"
                            description="项目本身可推送到Github上, 独立的纯文件项目, 可以轻松的使用git进行版本管理."
                            icon={<i className="fas fa-cogs" />}
                            link="/docs/functions"
                        />
                        <FeatureCard
                            title="响应式博客 / 移动端支持"
                            description="博客两端适配, 完全自适应手机端浏览，登录即可拥有一个专属博客。"
                            icon={<i className="fas fa-mobile-alt" />}
                            link="/docs/responsive"
                        />
                    </div>
                </div>
            </main>
        </Layout >
    );
}
