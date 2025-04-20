import React from 'react';
import Giscus from '@giscus/react';
import {
    useThemeConfig,
    useColorMode,
    ThemeConfig
} from '@docusaurus/theme-common';

type GiscusProps = React.ComponentProps<typeof Giscus>;

interface CustomThemeConfig extends ThemeConfig {
    giscus: GiscusProps & { darkTheme: string };
}

/**
 * 定义一个组件, 会判断当前颜色主题和用户配置, 然后生成`Giscus`组件.
 * @returns 
 */
const HXGiscus: React.FC = () => {
    const { giscus } = useThemeConfig() as CustomThemeConfig;
    const { colorMode } = useColorMode();
    const { theme = 'light', darkTheme = 'dark_dimmed' } = giscus;
    const giscusTheme = colorMode === 'dark' ? darkTheme : theme;

    return (
        <Giscus
            id="comments"
            mapping="title"
            strict="1"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            lang="zh-CN"
            loading="lazy"
            {...giscus}
            theme={giscusTheme}
        />
    );
};

export default HXGiscus;