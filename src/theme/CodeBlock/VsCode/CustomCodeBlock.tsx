// src/theme/CodeBlock/VsCode/CustomCodeBlock.tsx
import React, { ReactNode } from 'react';
import CodeBlock from '../../../components/CodeBlock'; // 确保路径正确

interface CustomCodeBlockProps {
  children: ReactNode; // 代码块的内容
  className: string;   // 代码块的类名，包含语言信息
}

const CustomCodeBlock: React.FC<CustomCodeBlockProps> = ({ children, className }) => {
  console.log('CustomCodeBlock component rendered');

  const language = className?.replace('language-', '') || 'text'; // 默认值为 'text', 防止 className 无法识别
  const isEditable = className?.includes('vscode'); // 判断是否为 vscode 标签

  console.log("Language:", language);  // 打印语言
  console.log("isEditable:", isEditable);  // 打印 isEditable 是否为 true

  return <CodeBlock language={language} value={String(children)} isEditable={isEditable} />;
};

export default CustomCodeBlock;
