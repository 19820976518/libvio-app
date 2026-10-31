# LIBVIO iOS App（WebView 壳）

把 libvio 系列影视站包成一个全屏 iOS App：独立图标、无 Safari 地址栏、启动图、记住上次线路、内置多条备用入口。

技术栈：[Capacitor 6](https://capacitorjs.com/) + WKWebView。

---

## 你现在的情况：没有 Mac

**不用买 Mac，不用租云电脑。** 这个工程已经配好了 GitHub 云端编译流水线——你只要把代码传到 GitHub，GitHub 会免费借你一台 macOS 机器自动编译，5–10 分钟后给你一个 IPA 文件，然后在 Windows 上用 Sideloadly 数据线装到自己 iPhone。

全程免费，唯一成本是你的 Apple ID（不用花钱注册开发者账号）。

---

## 完整步骤（照着做，约 20 分钟）

### 第 1 步：注册 GitHub 账号

打开 https://github.com/signup ，用邮箱注册一个免费账号（已有就直接登录）。

### 第 2 步：新建一个仓库

1. 登录后右上角 **+** → **New repository**
2. **Repository name** 填：`libvio-app`
3. 选 **Public**（公开）——Public 仓库的 Actions 构建**完全免费**、不限时长；Private 会消耗每月免费额度
4. **不要**勾 "Add a README"、"Add .gitignore"、"Choose a license"（我们本地已经有了）
5. 点 **Create repository**

### 第 3 步：把工程文件传上去

1. 在新仓库页面，点 **"uploading an existing file"** 这个链接（在"…or push an existing repository"那行下面）
2. 打开本电脑的 `libvio-app` 文件夹，**全选里面所有内容**（包括 `.github`、`assets`、`www`、`package.json`、`capacitor.config.json`、`README.md`），**整个文件夹的内容拖进浏览器上传区**
   - 注意：是把文件夹**里面的东西**拖进去，不是把 `libvio-app` 这个文件夹本身拖进去
   - `.github` 是隐藏文件夹，但 GitHub 网页端会显示，确保一起传上去（这是触发自动编译的关键）
3. 等上传完（图标 PNG 约 480KB，很快）
4. 页面底部点 **Commit changes**

### 第 4 步：等 GitHub 自动编译

1. 仓库页面顶部切到 **Actions** 标签
2. 第一次进会看到 "Workflows aren't being run on this forked repository" 之类提示，点 **"I understand my workflows, go ahead and enable them"**
3. 左边选 **Build iOS IPA (unsigned)**
4. 右侧点 **Run workflow** → 如果它已经因为你刚才 push 自动在跑了就不用点
5. 等 5–10 分钟。绿色 ✅ 就是成功，红色 ❌ 就是失败（点进去看报错截图发我）

### 第 5 步：下载 IPA

1. 点进那条绿色的构建记录
2. 页面最下面 **Artifacts** 区域 → 点 **libvio-ipa**
3. 浏览器会下载一个 zip，解压后得到 `libvio-unsigned.ipa`

### 第 6 步：在 Windows 上装 Sideloadly

1. 下载 Sideloadly：https://sideloadly.io/ （点 Download for Windows）
2. 装 **iTunes**（从苹果官网下 64 位版本，不是 Microsoft Store 版）：https://www.apple.com/itunes/download/win64
3. 装完打开 iTunes，用数据线把 iPhone 连到电脑，第一次连接 iPhone 上点"信任此电脑"
4. 关掉 iTunes，打开 **Sideloadly**

### 第 7 步：把 IPA 装进 iPhone

1. Sideloadly 顶部确认设备选到了你的 iPhone
2. 把 `libvio-unsigned.ipa` **拖进 Sideloadly 的 IPA 框**
3. **Apple account** 填你自己的 Apple ID 邮箱（就是你平时下 App Store 用的那个）
4. 点 **Start**
5. 第一次会让你输 Apple ID 密码（这是苹果官方的登录验证，Sideloadly 只是代为注册调试证书，不会存你的密码）
6. 等 1–2 分钟，Sideloadly 显示 "Done" 就装好了

### 第 8 步：在 iPhone 上信任开发者

1. iPhone → **设置 → 通用 → VPN 与设备管理**
2. 会看到你 Apple ID 邮箱对应的"开发者应用"，点进去 → **信任**
3. 回桌面，LIBVIO 图标就在那里了，点开就能用

---

## 重要：7 天过期

免费 Apple ID 侧载的 App **每 7 天会失效**（图标变灰打不开）。到期后：
- 手机连电脑
- 打开 Sideloadly，它会自动记住上次的 IPA，点 **Start** 再签一次就行（1 分钟）

想长期不过期，需要花 $99/年买 Apple Developer 账号。对你自己用 7 天重签一次完全够用。

---

## 以后想改线路

直接编辑仓库里的 `www/index.html`，把 `<button class="btn btn-line" data-url="...">` 那几行的 URL 改成新域名，点 Commit。GitHub 会自动重新跑流水线，5 分钟后去 Actions 下载新 IPA，Sideloadly 再装一次即可。

---

## 目录结构

```
libvio-app/
├── .github/workflows/build-ipa.yml   # GitHub 自动编译配置
├── package.json                     # 依赖与脚本
├── capacitor.config.json            # 壳配置
├── assets/
│   ├── icon/icon.png                # 1024 图标源
│   └── splash.png                   # 启动图源
└── www/                             # App 内加载的本地页面
    ├── index.html                   # 启动页（线路选择）
    ├── styles.css
    └── app.js                       # 记住上次线路、跳转逻辑
```

---

## 常见问题

**Q：Actions 跑红了怎么办？**
点进红色那条，看最下面的报错日志（红色那几行），截图发我。

**Q：Sideloadly 报 "Could not find device"？**
iTunes 没装好，或者 iPhone 没点"信任此电脑"。重新插数据线，手机弹窗点信任。

**Q：App 打开白屏？**
大概率是 `npx cap sync` 没跑——检查 Actions 日志里有没有这一步的绿色 ✓。

**Q：视频播放问题？**
壳已默认开启 HLS 内联播放和 AirPlay。如果某站强制全屏播放，那是站方的播放器设置，不是壳的问题。
