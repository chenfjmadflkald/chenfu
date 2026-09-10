---
name: git-commit-gitee
description: 将项目通过git commit并push到Gitee仓库。Use when committing and pushing code to Gitee repositories, or when user mentions Gitee, gitee.com, or wants to push code to remote repositories.
---

# Git Commit to Gitee

将本地项目提交并推送到Gitee仓库的技能。

## 前置条件

1. 已安装Git
2. 有Gitee仓库地址
3. 有Gitee私人令牌或用户名密码

## 操作步骤

### 1. 初始化Git仓库（如果尚未初始化）

```bash
git init
```

### 2. 创建.gitignore文件

排除不需要提交的文件，如node_modules、日志文件等：

```bash
# 常见的.gitignore内容
node_modules/
.DS_Store
*.log
.env
```

### 3. 添加远程仓库

使用HTTPS方式添加远程仓库：

```bash
git remote add origin https://gitee.com/用户名/仓库名.git
```

### 4. 配置凭证

#### 方法一：使用git credentials store（推荐）

```bash
git config credential.helper store
```

然后在推送时输入用户名和令牌/密码。

#### 方法二：直接在URL中嵌入令牌

```bash
git remote add origin https://令牌@gitee.com/用户名/仓库名.git
```

#### 方法三：使用用户名:令牌格式

```bash
git remote add origin https://用户名:令牌@gitee.com/用户名/仓库名.git
```

### 5. 添加文件并提交

```bash
git add .
git commit -m "提交信息"
```

### 6. 推送到远程仓库

```bash
git push -u origin master
```

如果远程仓库已有内容，需要先拉取合并：

```bash
git pull origin master --allow-unrelated-histories
```

然后解决冲突后再次推送。

## 常见问题

### 认证失败

- 检查令牌是否正确
- 确认令牌有仓库访问权限
- 尝试不同的认证方式

### 推送被拒绝

远程仓库有新内容，需要先拉取合并：

```bash
git pull origin master
# 解决冲突
git add .
git commit -m "合并远程更改"
git push origin master
```

### 冲突解决

编辑冲突文件，删除冲突标记（<<<<<<<、=======、>>>>>>>），保留需要的内容，然后提交。

## 示例

```bash
# 完整流程
git init
git remote add origin https://gitee.com/neusoft_wangyao_jsj/webdesign004project.git
git config credential.helper store
git add .
git commit -m "初始提交"
git push -u origin master
```
