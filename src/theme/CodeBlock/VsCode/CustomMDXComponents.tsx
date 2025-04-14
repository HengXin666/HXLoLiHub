// src/theme/CodeBlock/VsCode/CustomMDXComponents.tsx
import React from 'react';
import CustomCodeBlock from './CustomCodeBlock';

// 返回一个包含 `code` 映射的对象
const CustomMDXComponents = () => ({
  code: CustomCodeBlock, // 替换默认的 code 组件
});

export default CustomMDXComponents;
