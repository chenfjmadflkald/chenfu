# AGENTS.md

王垚《高级网页设计》课程的静态 HTML/CSS/JS 作业站点。仓库根目录没有 `package.json`、构建、测试、lint 或 CI。每个页面都是独立的，直接在浏览器中打开即可。

## 动手之前

- 每次执行前，先把用户提示词**连同我的回复**一起追加到 `cf_prompt.md`。表格格式：时间 | 模型 | 用户提示词 | 我的回复（简述）。保持文件不被 Git 跟踪。
- 新增的 CSS 类名、id、JS 变量统一加 `cf_` 前缀。`grid.html`、`html_basic001.html` 等旧页面不遵守此约定，除非明确要求，否则不要重构它们。
- 文件保持 UTF-8 编码，正文内容为中文。
- 新增页面时，要在根目录 `index.html`（课程目录页）里加一张卡片或一个链接。目录页落后于较新的页面（`0609cf.html`、`iconfont-1..4.html` 等），新增或完成页面后记得同步更新。
- 只使用本地资源。第三方库放在 `cdn/` 下（Font Awesome：`cdn/font-awesome/all.min.css`；Lucide：`cdn/lucide/lucide.min.js`），图标放在 `font/` 下（`iconfont.css`、`iconfont.js`）。不要引入远程 CDN 链接。

## 目录结构

- 根目录的 `*.html` 与同级 `*.css` 是各自独立的练习页面，很多页面的 CSS/JS 直接内联。`index.html` 是课程目录页与入口。
- `data.js` 暴露全局 `window.STUDENTS` / `window.SUBJECTS`，由 `0609cf.html`（学生成绩面板）使用。该文件注释里提到的 `starter.html` / `target.html` 并不存在。
- `wangyao-information/` 是一个独立的小站点，有自己的 `img/` 目录和相对链接。
- `font/` 与 `cdn/` 是第三方或生成资源。`font/iconfont.*` 由 iconfont.cn 生成，不要手工编辑。
- `git-portable/`、`git-portable.exe`、`.trae/`、`cf_prompt.md` 属于本机工具与日志，不要提交。
- `.opencode/node_modules` 只是 OpenCode 插件 SDK。仓库根目录没有 npm 工程，不要执行 npm 的 build 或 test 脚本。

## 验证方式

项目没有任何自动化检查。打开改动后的页面（例如 `Start-Process .\index.html`），确认相对资源路径正确、响应式布局正常。项目没有开发服务器。

## Git 与发布

- 当前远端：`origin` 指向 `https://gitee.com/chen-fu11/chen-fu.git`、`github` 指向 `git@github.com:chenfjmadflkald/chenfu.git`，分支 `master`。
- 工作区里存在早前合并遗留的无关删除与修改。禁止使用 `git add -A` 或 `git add .`，只暂存自己改动的文件。不要恢复无关的被删学生目录。
- 除非明确要求，否则不要推送，也不要调用 Gitee/GitHub 提交技能。绝不要把令牌写进被跟踪的文件；凭据只放在 `.git/config` 或环境变量里。
- 新页面的设计指引见 `skills/frontend-design/SKILL.md`（OpenCode 不会自动加载）。
