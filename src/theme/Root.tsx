// src/theme/Root.tsx
import React from 'react';
import { MDXProvider } from '@mdx-js/react'; // Docusaurus 3.x 提供的 MDXProvider
import CustomMDXComponents from './CodeBlock/VsCode/CustomMDXComponents';  // 导入你自定义的组件映射

const Root: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MDXProvider components={CustomMDXComponents()}>
      {children}
    </MDXProvider>
  );
};

export default Root;
