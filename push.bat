@echo off
:: 构建 目录文件
node .\scripts\generateSidebar.js

:: 如果有输入参数, 则提交, 然后构建, 否则仅add
if "%1"=="" (
    git add .
) else (
    git add .
    git commit -m %1
    git push origin
    npm run docusaurus deploy
)