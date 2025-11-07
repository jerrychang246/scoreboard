# Git 安装指南

## 问题说明
如果 PowerShell 提示"无法将git项识别为cmdlet"，说明系统中没有安装 Git 或者 Git 没有添加到系统环境变量中。

## 解决方案

### 方法一：安装 Git for Windows（推荐）

#### 步骤 1：下载 Git
1. 访问 Git 官方网站：https://git-scm.com/download/win
2. 下载适合你系统的 Git 安装程序（通常是 64-bit Git for Windows Setup）

#### 步骤 2：安装 Git
1. 运行下载的安装程序（.exe 文件）
2. 在安装过程中，**重要**：在 "Select Components" 页面，确保勾选：
   - ✅ Git Bash Here
   - ✅ Git GUI Here
   - ✅ **Associate .git* configuration files with the default text editor**
   - ✅ **Associate .sh files to be run with Bash**
   
3. 在 "Choosing the default editor" 页面，选择你喜欢的编辑器（默认 Notepad++ 或 Vim 都可以）

4. 在 "Adjusting your PATH environment" 页面，**选择第二个选项**：
   - ✅ **Git from the command line and also from 3rd-party software**
   （这个选项会将 Git 添加到系统 PATH 中，这样 PowerShell 就能识别 git 命令了）

5. 其他选项保持默认即可，点击 "Next" 完成安装

#### 步骤 3：验证安装
1. **关闭当前的 PowerShell 窗口**（重要！需要重新加载环境变量）
2. 重新打开 PowerShell
3. 输入以下命令验证：
```powershell
git --version
```
4. 如果显示版本号（如 `git version 2.xx.x`），说明安装成功！

### 方法二：使用包管理器安装（如果已安装 Chocolatey）

如果你已经安装了 Chocolatey 包管理器，可以使用以下命令安装：

```powershell
choco install git
```

### 方法三：使用 winget 安装（Windows 10/11）

如果你使用的是 Windows 10 或 Windows 11，可以使用内置的 winget 包管理器：

```powershell
winget install --id Git.Git -e --source winget
```

## 安装后配置

### 1. 配置用户信息（首次使用必须）
```powershell
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

### 2. 验证配置
```powershell
git config --global --list
```

## 使用 Git 提交项目到 GitHub

安装并配置好 Git 后，可以使用以下命令将项目提交到 GitHub：

```powershell
# 1. 初始化 Git 仓库
git init

# 2. 添加所有文件
git add .

# 3. 提交代码
git commit -m "first commit"

# 4. 重命名分支为 main（如果需要）
git branch -M main

# 5. 添加远程仓库（替换为你的实际仓库地址）
git remote add origin https://github.com/jerrychang246/scoreboard.git

# 6. 推送到 GitHub（首次推送需要登录）
git push -u origin main
```

**注意**：首次使用 `git push` 时，GitHub 可能会要求你输入用户名和密码（或 Personal Access Token）。

## 常见问题

### Q: 安装后仍然提示找不到 git 命令？
A: 
1. 确保在安装时选择了"Git from the command line"选项
2. 关闭并重新打开 PowerShell（环境变量需要重新加载）
3. 如果还是不行，手动添加 Git 到 PATH：
   - 找到 Git 安装目录（通常是 `C:\Program Files\Git\cmd`）
   - 添加到系统环境变量 PATH 中

### Q: 如何查看 Git 安装路径？
A: 在 PowerShell 中输入：
```powershell
where.exe git
```

### Q: 如何更新 Git？
A: 下载最新版本的安装程序，直接运行安装即可（会自动更新）

## 需要帮助？

如果安装过程中遇到任何问题，可以：
1. 查看 Git 官方文档：https://git-scm.com/doc
2. 检查 GitHub 帮助文档：https://docs.github.com/


