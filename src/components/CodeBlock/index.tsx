// src/components/CodeBlock/index.tsx
import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

interface CodeBlockProps {
    language: string;
    value: string;
    isEditable: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value, isEditable }) => {
    console.log("CodeBlock rendered with:", { language, value, isEditable });
    const [code, setCode] = useState<string>(value);

    const handleChange = (newCode: string) => {
        setCode(newCode);
    };

    const handleReset = () => {
        setCode(value); // 还原代码
    };

    if (isEditable) {
        return (
            <div>
                <MonacoEditor
                    language={language}
                    value={code}
                    onChange={handleChange}
                    options={{
                        minimap: { enabled: false },
                        theme: 'vs-dark', // VSCode 默认主题
                    }}
                />
                <button onClick={handleReset}>还原代码</button>
            </div>
        );
    } else {
        return (
            <pre>
                <code className={`language-${language}`}>{value}</code>
            </pre>
        );
    }
};

export default CodeBlock;
