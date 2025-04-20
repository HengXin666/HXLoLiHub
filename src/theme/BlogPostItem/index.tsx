import React, { JSX, type ReactNode } from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type { WrapperProps } from '@docusaurus/types';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import HXGiscus from '../../components/Giscus';

type Props = WrapperProps<typeof BlogPostItemType>;

export default function BlogPostItemWrapper (props: Props): JSX.Element {
  const { isBlogPostPage } = useBlogPost();

  return (
    <>
      <BlogPostItem {...props} />
      {/* Prevent giscus to show up on blog post menu */}
      {isBlogPostPage && (
          <HXGiscus />
      )}
    </>
  );
}