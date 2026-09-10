---
name: gitee-commit
description: 提交项目到Gitee仓库。当用户要求提交代码、推送项目到Gitee、git commit、git push时使用。
---

# Gitee项目提交技能

## 使用场景
当用户要求将本地项目提交到Gitee仓库时使用此技能。

## 配置信息
- **仓库地址**: https://gitee.com/neusoft_wangyao_jsj/webdesign004project.git
- **私人令牌**: 4d8912d1ec97688b7944c617c6850bd0

## 操作步骤

### 1. 初始化Git仓库（如果尚未初始化）
```bash
git init
```

### 2. 添加远程仓库（使用令牌认证）
```bash
git remote add origin https://oauth2:4d8912d1ec97688b7944c617c6850bd0@gitee.com/neusoft_wangyao_jsj/webdesign004project.git
```

### 3. 添加所有文件到暂存区
```bash
git add .
```

### 4. 提交更改
```bash
git commit -m "提交高级网页设计项目"
```

### 5. 推送到远程仓库
```bash
git push -u origin master
```

## 注意事项
- 首次推送会自动设置上游分支
- 使用令牌认证可以避免每次输入密码
- 确保所有文件都已保存后再执行提交操作
