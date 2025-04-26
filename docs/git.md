# Git 版本控制入门指南

> Git是目前世界上最先进的分布式版本控制系统，它可以有效地管理我们的代码，跟踪每一次代码的修改，并且支持多人协作开发。本指南将帮助你快速掌握Git的基本使用。

## 0. 安装Git

在开始使用Git之前，我们需要先安装它。以下是不同操作系统的安装方法：

### Windows安装

1. 访问Git官方网站下载页面：[点击跳转：https://git-scm.com/downloads](https://git-scm.com/downloads)
2. 下载Windows版本的安装包
3. 运行安装程序，使用默认选项即可
4. 安装完成后，在命令提示符或PowerShell中输入以下命令验证安装：
   ```bash
   git --version
   ```

### Linux安装

对于Ubuntu/Debian系统：
```bash
# 更新包索引
sudo apt update
# 安装Git
sudo apt install git
```

对于CentOS/RHEL系统：
```bash
sudo yum install git
```

### macOS安装

1. 使用Homebrew安装（推荐）：
   ```bash
   brew install git
   ```

2. 或者从官网下载macOS安装包：[https://git-scm.com/downloads](https://git-scm.com/downloads)

安装完成后，请继续进行Git的基本配置。

## 1. 配置Git

在开始使用Git之前，我们需要先进行基本配置。这些配置会告诉Git你是谁，这样在提交代码时就能够正确记录作者信息。

```bash
# 设置你的用户名
git config --global user.name "your name"
# 设置你的邮箱
git config --global user.email "your email"
```

::: tip 小贴士
- `--global` 参数表示这个配置对当前用户的所有仓库都有效
- 如果想要某个仓库使用不同的配置，可以在仓库目录下使用不带 `--global` 的命令
:::

## 2. 创建Git仓库

有两种方法来开始使用Git管理你的项目：

### 2.1 初始化新仓库

如果你想要将一个新项目纳入Git管理：

```bash
# 进入项目目录
cd your-project
# 初始化Git仓库
git init
```

### 2.2 克隆现有仓库

如果你要参与一个已存在的项目：

```bash
# 克隆远程仓库到本地
git clone <repository-url>
```

## 3. 了解工作区状态

在Git中，了解当前工作区的状态是非常重要的。你可以随时查看哪些文件被修改了，哪些文件已经准备好提交：

```bash
# 查看工作区状态
git status

# 查看详细的文件变化
git diff
```

::: tip 记忆技巧
- `git status` 就像照镜子，让你看到当前工作区的"容貌"
- `git diff` 则像显微镜，让你看清每一行代码的变化
:::

## 5. 分支管理

分支是Git中最强大的功能之一，它允许我们在不影响主线开发的情况下进行新功能开发或问题修复。

### 5.1 分支操作基础

```bash
# 查看所有分支
git branch

# 创建新分支
git branch <branch-name>

# 切换到指定分支
git checkout <branch-name>
# 或使用更新的命令（推荐）
git switch <branch-name>

# 创建并切换到新分支
git checkout -b <branch-name>
# 或使用更新的命令（推荐）
git switch -c <branch-name>
```

### 5.2 分支合并

```bash
# 合并指定分支到当前分支
git merge <branch-name>

# 在合并发生冲突时，解决冲突后继续合并
git merge --continue
```

::: tip 使用场景
- 开发新功能时：创建feature分支
- 修复bug时：创建hotfix分支
- 日常开发建议：从main/master分支创建开发分支进行开发
:::

## 6. 远程仓库操作

在团队协作中，我们需要经常与远程仓库进行交互：

```bash
# 查看远程仓库信息
git remote -v

# 添加远程仓库
git remote add <remote-name> <repository-url>

# 从远程仓库获取更新
git fetch <remote-name>

# 拉取远程分支并合并到当前分支
git pull <remote-name> <branch-name>

# 推送本地分支到远程仓库
git push <remote-name> <branch-name>
```

::: warning 最佳实践
- 推送前先拉取：避免冲突
- 定期同步：保持本地代码与远程仓库的同步
- 谨慎使用force push：可能会覆盖他人的提交
:::

## 7. 撤销与回退

在开发过程中，难免会遇到需要撤销或回退的情况：

```bash
# 撤销工作区的修改
git checkout -- <file-name>
# 或使用更新的命令（推荐）
git restore <file-name>

# 撤销暂存区的修改
git reset HEAD <file-name>
# 或使用更新的命令（推荐）
git restore --staged <file-name>

# 回退到指定的提交
git reset --hard <commit-id>
```

::: danger 注意
- `git reset --hard` 会丢失工作区的所有修改，使用前请确保已提交或备份重要修改
- 如果已经推送到远程仓库，回退后需要使用 `git push -f` 强制推送（需要特别谨慎）
:::

## 8. 常用技巧

### 8.1 保存临时修改

当你正在进行某项工作，但需要临时切换到其他任务时：

```bash
# 保存当前工作进度
git stash

# 查看保存的工作进度列表
git stash list

# 恢复最近的工作进度
git stash pop
```

### 8.2 查看提交历史

```bash
# 查看提交历史
git log

# 查看简洁的提交历史
git log --oneline

# 查看分支合并图
git log --graph --pretty=oneline --abbrev-commit
```

::: tip 小贴士
- 使用 `git log --author="username"` 查看指定作者的提交
- 使用 `git log -p <file-name>` 查看指定文件的修改历史
:::

