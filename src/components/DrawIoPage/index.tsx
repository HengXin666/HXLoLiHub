import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// @ts-ignore
import { DrawIoEmbed } from 'react-drawio';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

// 使用TextEncoder进行Base64编码
const encodeBase64 = (str: string): string => {
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(str);
    let binary = '';
    uint8Array.forEach(byte => {
        binary += String.fromCharCode(byte);
    });
    return btoa(binary);
};

const DrawIoPage: React.FC = () => {
    const query = useQuery();
    const src = query.get('src'); // 获取 ?src 参数
    const [initialXML, setInitialXML] = useState<string | null>(null);

    // 当 src 存在时, 加载并转换为 Base64 格式
    useEffect(() => {
        const fetchSvg = async (svgUrl: string) => {
            try {
                // 获取 SVG 文件
                const response = await fetch(svgUrl);
                const svgText = await response.text(); // 获取 SVG 文件的文本内容

                // 将 SVG 内容转换为 Base64 编码
                const base64 = encodeBase64(svgText); // 将文本内容转为 Base64 编码
                setInitialXML(`data:image/svg+xml;base64,${base64}`); // 设置 Base64 编码后的 XML 数据
            } catch (error) {
                console.error('加载 SVG 文件失败:', error);
            }
        };

        if (src) {
            fetchSvg(src);
        }
    }, [src]);

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {initialXML ? (
                    <DrawIoEmbed
                        xml={initialXML} // 传递 Base64 编码的 SVG 数据
                        urlParameters={{
                            ui: 'dark',
                            spin: true,
                            libraries: true,
                            saveAndExit: false,
                        }}
                    />
            ) : (
                <p>未找到图形文件: {src}</p>
            )}
        </div>
    );
};

export default DrawIoPage;
