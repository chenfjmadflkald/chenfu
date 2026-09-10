---
name: gitee-push
description: Use when committing and pushing the Advanced Web Design project (高级网页设计) to the Gitee repository gitee.com/neusoft_wangyao_jsj/webdesign004project. Triggers on words like push to gitee, 提交项目, commit, 高级网页设计, webdesign004project.
---

# Gitee Push Workflow

Commit and push the project to the Gitee repository.

## Project info

- Local project: `C:\Users\meigu\Desktop\vs`
- Gitee repo: `https://gitee.com/neusoft_wangyao_jsj/webdesign004project.git`
- Branch: `master` (push with `-u origin master`, `--force` only when needed)

## Steps

1. Verify files are present (index.html, html_basic001.html, html_basic.css, img/).
2. `git init` if not already a repo.
3. `git add -A` then `git commit -m "<meaningful message>"`.
4. Set remote: `git remote add origin https://gitee.com/neusoft_wangyao_jsj/webdesign004project.git` (repo may already exist remotely).
5. Push with private token from env var `GITEE_TOKEN`, never embed the raw token in a tracked file:
   `git push -u origin master`
   The token must be supplied via credential/URL for this push only.

## Security rules

- Never write the token into SKILL.md, source files, or any tracked file.
- Never log the full token. Refer to it as `{env:GITEE_TOKEN}`.
- Never commit `.git/config` or any local credential files.