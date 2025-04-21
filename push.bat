@echo off
chcp 65001

:: 构建 目录文件
node .\scripts\generateSidebar.js

:: 如果有输入参数, 则提交, 然后构建, 否则仅add
if "%~1"=="" (
    git add .
    echo 请输入提交信息, 调用格式为 .\push.bat "提交信息"
) else (
    echo 提交信息: %~1
    git add .
    git commit -m "%~1"
    git push origin
)