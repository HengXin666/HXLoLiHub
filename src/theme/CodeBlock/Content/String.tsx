import React, { type ReactNode } from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { useThemeConfig, usePrismTheme } from '@docusaurus/theme-common';
import {
    parseCodeBlockTitle,
    parseLanguage,
    parseLines,
    containsLineNumbers,
    useCodeWordWrap,
} from '@docusaurus/theme-common/internal';
import { Highlight, type Language } from 'prism-react-renderer';
import Line from '@theme/CodeBlock/Line';
import CopyButton from '@theme/CodeBlock/CopyButton';
import WordWrapButton from '@theme/CodeBlock/WordWrapButton';
import Container from '@theme/CodeBlock/Container';
import type { Props } from '@theme/CodeBlock/Content/String';

import * as monaco from "monaco-editor";
import MonacoEditor from 'react-monaco-editor'; // VSCode 编辑器
import { loader } from '@monaco-editor/react';
import { debounce } from 'lodash'; // 引入 lodash 的 debounce 防抖函数

import monacoThemes from './OneDark-Pro.json';
import styles from './styles.module.css';


// 创建主题
loader.init().then((monaco) => {
    try {
        monaco.editor.defineTheme('one-dark-pro', monacoThemes as monaco.editor.IStandaloneThemeData);
    } catch (error) {
        console.error('Error defining theme:', error);
    }
});

function languageEscape (language: string | undefined): string | undefined {
    language = language?.toLowerCase();
    switch (language) {
        case 'c':
        case 'c++':
            return 'cpp';
        case 'py':
            return 'python';

        // @todo 目前有bug, 一用这些就报错, 只好不用了, 下面的都是!!!, 只好重定向暂时替代了
        // https://github.com/microsoft/monaco-editor/issues/4739
        // 如果还有bug, 日后修复... fk...
        case 'typescript':
        case 'ts':
            return 'cpp';
        case 'javascript':
        case 'js':
            return 'cpp';
        case 'html':
            return 'xml';
        case 'scss':
        case 'css':
            return 'yaml';
        case 'json':
            return 'cpp';
    }
    return language;
}


// Prism languages are always lowercase
// We want to fail-safe and allow both "php" and "PHP"
// See https://github.com/facebook/docusaurus/issues/9012
function normalizeLanguage (language: string | undefined): string | undefined {
    return language?.toLowerCase();
}

export default function CodeBlockString ({
    children,
    className: blockClassName = '',
    metastring,
    title: titleProp,
    showLineNumbers: showLineNumbersProp,
    language: languageProp,
}: Props): ReactNode {
    const {
        prism: { defaultLanguage, magicComments },
    } = useThemeConfig();

    // 获取语言
    const fkPrefixLanguage: string = blockClassName.length ? blockClassName.split("-")[1] : '';

    const language = normalizeLanguage(
        languageProp ?? parseLanguage(blockClassName) ?? defaultLanguage,
    );

    // 为我们自定义的结构 (VsCode 渲染)
    if (metastring?.length === 6 && metastring.toUpperCase() === "VSCODE") {
        // Monaco 的初始化设置
        const [code, setCode] = useState<string>(children);
        const [editorHeight, setEditorHeight] = useState<number>(200); // 初始高度

        const handleChange = useCallback(
            debounce((newCode: string) => {
                setCode(newCode);
                const lines = newCode.split('\n').length;
                const newHeight = lines * 20; // 每行20px
                setEditorHeight(newHeight); // 更新编辑器高度
            }, 100), // 设置防抖延迟为 300ms
            [],
        );

        const handleReset = () => {
            setCode(children);      // 还原代码
            handleChange(children); // 更新高度
        };

        // 初始化编辑器
        const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
            editor.updateOptions({ renderLineHighlight: 'none' })

            // 当前为焦点
            editor.onDidFocusEditorText(() => {
                editor.updateOptions({ renderLineHighlight: 'all' });
            });

            // 失去焦点
            editor.onDidBlurEditorText(() => {
                editor.updateOptions({ renderLineHighlight: 'gutter' });
            });
        };

        const monacoRef = useRef<typeof monaco | null>(null);

        const fkLanguageEscape = languageEscape(fkPrefixLanguage);

        useEffect(() => {
            loader.init().then(monaco => {
                monacoRef.current = monaco;
                monaco.editor.setTheme('one-dark-pro');

                import(`monaco-editor/esm/vs/basic-languages/${fkLanguageEscape}/${fkLanguageEscape}`)
                    .then(() => { })
                    .catch(() => { });
                
            });
                
            monaco.editor.createModel(code, fkLanguageEscape);

            return () => {
                // 卸载 model 防止 memory leak
                monacoRef.current?.editor.getModels().forEach(model => model.dispose());
            };
        }, [fkLanguageEscape]);

        return (
            <div style={{
                width: '100%', height: 'auto', overflow: 'hidden',
                marginTop: '20px', marginBottom: '20px'
            }}>
                <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', justifyContent: 'right' }}>
                    <button onClick={handleReset} style={{ padding: '5px 10px', fontSize: '14px' }}>还原代码</button>
                    <button style={{ padding: '5px 10px', fontSize: '14px' }}>{fkPrefixLanguage}</button>
                </div>
                <>
                    <MonacoEditor
                        language={fkLanguageEscape}
                        value={code}
                        onChange={handleChange}
                        editorWillMount={() => {
                            handleReset()
                        }}
                        options={{
                            minimap: { enabled: false },
                            theme: 'one-dark-pro',
                            automaticLayout: false,
                            language: fkLanguageEscape,
                            padding: { top: 10, bottom: 20 },
                            lineNumbersMinChars: 3,
                            scrollbar: {
                                vertical: 'hidden', // 隐藏垂直滚动条
                                alwaysConsumeMouseWheel: true, // 禁用鼠标滚轮滚动
                                handleMouseWheel: false, // 禁用编辑器内的鼠标滚轮事件
                            },
                            scrollBeyondLastLine: false, // 禁止滚动到最后一行之后
                            mouseWheelZoom: false, // 禁用鼠标滚轮缩放
                            renderFinalNewline: 'dimmed', // 是否显示最后一行的行号
                            cursorSurroundingLines: 0, // 初始化时禁用辅助行
                            cursorSurroundingLinesStyle: 'default',
                            overviewRulerLanes: 0,
                            fixedOverflowWidgets: true,
                            hideCursorInOverviewRuler: true,
                            overviewRulerBorder: false,
                            cursorBlinking: 'smooth',    // 光标样式
                        }}
                        width="100%"
                        height={editorHeight}
                        editorDidMount={handleEditorDidMount}
                    />
                </>
            </div>
        );
    }

    // We still parse the metastring in case we want to support more syntax in the
    // future. Note that MDX doesn't strip quotes when parsing metastring:
    // "title=\"xyz\"" => title: "\"xyz\""
    const title = parseCodeBlockTitle(metastring) || titleProp;

    // 默认就应该显示数字
    const showLineNumbers = true;
    // showLineNumbersProp ?? containsLineNumbers(metastring);

    const prismTheme = usePrismTheme();
    const wordWrap = useCodeWordWrap();

    const { lineClassNames, code } = parseLines(children, {
        metastring,
        language,
        magicComments,
    });

    return (
        <Container
            as="div"
            className={clsx(
                blockClassName,
                language &&
                !blockClassName.includes(`language-${language}`) &&
                `language-${language}`,
            )}>
            {title && <div className={styles.codeBlockTitle}>{title}</div>}
            <div className={styles.codeBlockContent}>
                <Highlight
                    theme={prismTheme}
                    code={code}
                    language={(language ?? 'text') as Language}>
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre
                            /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
                            tabIndex={0}
                            ref={wordWrap.codeBlockRef}
                            className={clsx(className, styles.codeBlock, 'thin-scrollbar')}
                            style={style}>
                            <code
                                className={clsx(
                                    styles.codeBlockLines,
                                    showLineNumbers && styles.codeBlockLinesWithNumbering,
                                )}>
                                {tokens.map((line, i) => (
                                    <Line
                                        key={i}
                                        line={line}
                                        getLineProps={getLineProps}
                                        getTokenProps={getTokenProps}
                                        classNames={lineClassNames[i]}
                                        showLineNumbers={showLineNumbers}
                                    />
                                ))}
                            </code>
                        </pre>
                    )}
                </Highlight>
                <div className={styles.buttonGroup}>
                    {fkPrefixLanguage && <span className={styles.languageName}>{fkPrefixLanguage}</span>}
                    {(wordWrap.isEnabled || wordWrap.isCodeScrollable) && (
                        <WordWrapButton
                            className={styles.codeButton}
                            onClick={() => wordWrap.toggle()}
                            isEnabled={wordWrap.isEnabled}
                        />
                    )}
                    <CopyButton className={styles.codeButton} code={code} />
                </div>
            </div>
        </Container>
    );
}
