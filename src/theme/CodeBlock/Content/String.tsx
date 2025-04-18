import React, { type ReactNode } from 'react';
import { useState, useEffect, useCallback, useRef, useContext, createContext } from 'react';
import { useLocation } from "react-router-dom";
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

// 响应式全局变量
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// 选项卡
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BrowserOnly from '@docusaurus/BrowserOnly';
import { FaCheck } from 'react-icons/fa'; // 引入勾选图标
import type * as Monaco from 'monaco-editor'; // 仅引入类型

import monacoThemes from './OneDark-Pro.json';
import styles from './styles.module.css';
import OneDarkPro from '../../../css/prism-one-dark-darker.css';

import './leetcode.css';

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

/**
 * 创建默认代码块
 * @param param0 
 * @param fkPrefixLanguage 
 * @returns 
 */
function MakeSimpleCodeBlock (
    props: Props & { fkPrefixLanguage: string }
) {
    const {
        children,
        className: blockClassName = '',
        metastring,
        title: titleProp,
        showLineNumbers: showLineNumbersProp,
        language: languageProp,
        fkPrefixLanguage,
    } = props;

    const {
        prism: { defaultLanguage, magicComments },
    } = useThemeConfig();

    const language = normalizeLanguage(
        languageProp ?? parseLanguage(blockClassName) ?? defaultLanguage,
    );

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

    return metastring === 'leetcode'
        ? (
            <Container
                as="div"
                className={clsx(
                    blockClassName,
                    language &&
                    !blockClassName.includes(`language-${language}`) &&
                    `language-${language}`,
                )}
            >
                {title && <div className={styles.codeBlockTitle}>{title}</div>}
                <div 
                    className={clsx(styles.codeBlockContent, 'leetcode-tabs-content')}
                    style={{borderTopLeftRadius: '0px', borderTopRightRadius: '0px'}}
                >
                    <Highlight
                        theme={prismTheme}
                        code={code}
                        language={(language ?? 'text') as Language}>
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                            <pre
                                /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
                                tabIndex={0}
                                ref={wordWrap.codeBlockRef}
                                className={clsx(className, styles.codeBlock, 'thin-scrollbar')}>
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
        )
        : (
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

/**
 * 创建一个vscode同款编辑栏
 * @param param0 
 * @param fkPrefixLanguage 
 * @returns 
 */
function makeVsCodeCodeBlock ({
    children,
    className: blockClassName = '',
    metastring,
    title: titleProp,
    showLineNumbers: showLineNumbersProp,
    language: languageProp,
}: Props,
    fkPrefixLanguage: string
) {
    /*
        import * as monaco from "monaco-editor";
        import MonacoEditor from 'react-monaco-editor'; // VSCode 编辑器
        import { loader } from '@monaco-editor/react';
    */
    const monaco = require('monaco-editor');
    const { loader } = require('@monaco-editor/react');

    useEffect(() => {
        // 创建主题
        loader.init().then((monaco: any) => {
            try {
                monaco.editor.defineTheme('one-dark-pro', monacoThemes as Monaco.editor.IStandaloneThemeData);
            } catch (error) {
                console.error('Error defining theme:', error);
            }
        });
    }, []);

    // Monaco 的初始化设置
    const [code, setCode] = useState<string>(children);
    const [editorHeight, setEditorHeight] = useState<number>(200); // 初始高度

    const [isSelectedCopy, setIsSelectedCopy] = useState(false); // 控制是否显示钩选图标(复制时候)
    const [isSelected, setIsSelected] = useState(false); // 控制是否显示钩选图标(还原时候)
    const [tooltipVisible, setTooltipVisible] = useState(false); // 控制提示框显示

    // 复制到剪贴板函数
    const copyToClipboard = () => {
        navigator.clipboard.writeText(code).then(() => {
            setIsSelectedCopy(true); // 点击后显示钩选
            setTooltipVisible(true); // 显示提示框
            setTimeout(() => {
                setIsSelectedCopy(false); // 1.5秒后取消钩选状态
                setTooltipVisible(false); // 隐藏提示框
            }, 1500);
        });
    };

    const handleChange = (newCode: string) => {
        setCode(newCode);
        const lines = newCode.split('\n').length;
        const newHeight = lines * 20; // 每行20px
        setEditorHeight(newHeight); // 更新编辑器高度
    };

    const handleReset = () => {
        setIsSelected(true);
        setCode(children);      // 还原代码
        handleChange(children); // 更新高度
        setTooltipVisible(true); // 显示提示框
        setTimeout(() => {
            setIsSelected(false); // 1.5秒后取消钩选状态
            setTooltipVisible(false); // 隐藏提示框
        }, 1500);
    };

    // 初始化编辑器
    const handleEditorDidMount = (editor: Monaco.editor.IStandaloneCodeEditor) => {
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
        loader.init().then((monaco: any) => {
            monacoRef.current = monaco;
            monaco.editor.setTheme('one-dark-pro');

            import(`monaco-editor/esm/vs/basic-languages/${fkLanguageEscape}/${fkLanguageEscape}`)
                .catch(() => { });
        });

        monaco.editor.createModel(code, fkLanguageEscape);

        return () => {
            // 卸载 model 防止 memory leak
            monacoRef.current?.editor.getModels().forEach((model: any) => model.dispose());
        };
    }, [fkLanguageEscape]);

    return (
        <div style={{
            width: '100%', height: 'auto', overflow: 'hidden',
            marginTop: '20px', marginBottom: '20px'
        }}>
            <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', justifyContent: 'right' }}>
                <button
                    onClick={handleReset}
                    style={{
                        padding: '5px 10px',
                        fontSize: '14px',
                        backgroundColor: isSelected ? '#4CAF50' : '#990099', // 勾选后背景色变化
                        color: 'white',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'background-color 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {isSelected && (
                        <FaCheck style={{
                            marginRight: '5px',
                            animation: 'checkmark 0.5s ease-in-out', // 动画效果
                        }} />
                    )}
                    {'还原'}
                </button>
                <button
                    onClick={copyToClipboard}
                    style={{
                        padding: '5px 10px',
                        fontSize: '14px',
                        backgroundColor: isSelectedCopy ? '#4CAF50' : '#990099', // 勾选后背景色变化
                        color: 'white',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'background-color 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {isSelectedCopy && (
                        <FaCheck style={{
                            marginRight: '5px',
                            animation: 'checkmark 0.5s ease-in-out', // 动画效果
                        }} />
                    )}
                    {fkPrefixLanguage}
                </button>
            </div>
            <BrowserOnly>
                {() => {
                    const MonacoEditor = require('react-monaco-editor').default;
                    return (
                        <MonacoEditor
                            language={fkLanguageEscape}
                            value={code}
                            onChange={handleChange}
                            editorWillMount={() => {
                                handleChange(children); // 更新高度
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
                        />)
                }}
            </BrowserOnly>
        </div>
    );
}

type SimpleCodeBlockType = { props: Props } & { fkPrefixLanguage: string };

interface GroupedCodeBlocks {
    [groupName: string]: {
        head: string, // uesTitle
        list: { data: SimpleCodeBlockType, uesTitle: string }[]
    };
}

type Store = {
    groupedBlocks: GroupedCodeBlocks;
    setGroupedBlocks: (newState: GroupedCodeBlocks) => void;
    addCodeBlock: (
        groupName: string,
        item: { data: SimpleCodeBlockType; uesTitle: string }
    ) => void;
};

// 记录上一次的url, 如果url不同, 那么就初始化 useStore
let maeLocation: string = '';

// 全局的响应式的变量
const useStore = create<Store>()(
    immer((set) => ({
        groupedBlocks: {},
        setGroupedBlocks: (newState) => set(() => ({ groupedBlocks: newState })),
        addCodeBlock: (groupName, item) =>
            set((state) => {
                if (state.groupedBlocks[groupName] === undefined) {
                    state.groupedBlocks[groupName] = {
                        head: item.uesTitle,
                        list: [item]
                    };
                    return;
                }
                const alreadyExists = state.groupedBlocks[groupName].list.some(it => it.uesTitle === item.uesTitle);

                if (!alreadyExists) {
                    state.groupedBlocks[groupName].list.push(item);
                }
            }),
    }))
);

/**
 * 初始化页面, 如果url更新了, 那么会初始化`groupedBlocks`变量
 * @returns 
 */
function initComponent () {
    const location = useLocation();
    const groupedBlocks = useStore(state => state.groupedBlocks);
    const setGroupedBlocks = useStore((state) => state.setGroupedBlocks);
    const addCodeBlock = useStore(state => state.addCodeBlock);
    if (maeLocation != location.pathname) {
        setGroupedBlocks({}); // 清空缓存
        maeLocation = location.pathname; // 记录当前 path
    }
    return { groupedBlocks, addCodeBlock };
}

/**
 * 创建一个组合代码块 (力扣同款)
 * @param param0 
 * @param fkPrefixLanguage 
 * @param groupName 
 * @param titleName 
 * @returns 
 */
function makeTabsCodeBlock ({
    children,
    className: blockClassName = '',
    metastring,
    title: titleProp,
    showLineNumbers: showLineNumbersProp,
    language: languageProp,
}: Props,
    fkPrefixLanguage: string,
    groupName: string,
    titleName: string
) {
    const { groupedBlocks, addCodeBlock } = initComponent();

    addCodeBlock(groupName, {
        data: {
            props: {
                children,
                className: blockClassName = '',
                metastring: 'leetcode',
                title: titleProp,
                showLineNumbers: showLineNumbersProp,
                language: languageProp
            },
            fkPrefixLanguage
        },
        uesTitle: titleName
    });

    // 到时候记忆一下, 分组的第一个语言, 即可! (不是第一个的返回<>)
    return groupedBlocks[groupName] && groupedBlocks[groupName].head === titleName ? (
        <div className="leetcode_tabs_block">
            <Tabs className="leetcode_tabs">
                {groupedBlocks[groupName].list.map((item, index) => {
                    // 这里抽风了, 如果你的编译器报错, 请忽略
                    return (
                        <TabItem
                            value={item.uesTitle}
                        >
                            <MakeSimpleCodeBlock
                                {...item.data.props} // 得这样传递, 多个参数真难搞
                                fkPrefixLanguage={item.data.fkPrefixLanguage}
                            />
                        </TabItem>
                    )
                })}
            </Tabs>
        </div>
    ) : (<></>);
}

export default function CodeBlockString ({
    children,
    className: blockClassName = '',
    metastring,
    title: titleProp,
    showLineNumbers: showLineNumbersProp,
    language: languageProp,
}: Props): ReactNode {
    initComponent(); // 保证初始化页面

    // 获取语言
    const fkPrefixLanguage: string = blockClassName.length ? blockClassName.split("-")[1] : '';

    // 解析 metastring 判断是否包含 [组名-标题] 格式
    // 特别的, 它不会被渲染为 vscode 样式, 因为没有必要.
    const match = metastring?.match(/\[(.+)-(.+)\]/); // 提取 组名, 标题
    if (match) {
        return makeTabsCodeBlock({
            children,
            className: blockClassName = '',
            metastring,
            title: titleProp,
            showLineNumbers: showLineNumbersProp,
            language: fkPrefixLanguage,
        }, fkPrefixLanguage, match[1], match[2]);
    }

    // 为我们自定义的结构 (VsCode 渲染)
    if (metastring?.length === 6 && metastring.toUpperCase() === "VSCODE") {
        return <BrowserOnly fallback={<div>加载中...</div>}>{
            () => makeVsCodeCodeBlock({
                children,
                className: blockClassName = '',
                metastring,
                title: titleProp,
                showLineNumbers: showLineNumbersProp,
                language: languageProp,
            }, fkPrefixLanguage)
        }</BrowserOnly>;
    }

    // 默认代码块
    return MakeSimpleCodeBlock({
        children,
        className: blockClassName,
        metastring,
        title: titleProp,
        showLineNumbers: showLineNumbersProp,
        language: languageProp,
        fkPrefixLanguage
    });
}
