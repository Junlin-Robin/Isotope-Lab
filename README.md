# Isotope Lab 同位素实验室 <img src='./public/square-pants-logo.svg' alt="logo" width="30" height="30" />

<div align="center">

[![Version](https://img.shields.io/badge/version-0.0.4-blue.svg)](https://github.com/Junlin-Robin/quick-man)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/Junlin-Robin/quick-man/blob/main/LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.2.0-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.2.2-blue.svg)](https://www.typescriptlang.org/)

一个专注于量子化学计算后处理的现代化 Web 应用，用于简化 **振动频率/力常数 → 同位素分馏 / 力常数 / 红外、拉曼光谱** 的计算过程，实现 **批量化、工程化** 的计算流水线。

[在线体验](https://junlin-robin.github.io/quick-man/) | [问题反馈](https://github.com/Junlin-Robin/quick-man/issues) | [更新日志](./.versions/v0.0.3/log.md)

</div>


## ✨ 项目简介

Isotope Lab 是一个基于浏览器的量子化学计算辅助工具，专为同位素地球化学研究设计。它可以帮助研究人员快速处理量子化学软件（CASTEP、GAUSSIAN）的输出文件，自动完成同位素分馏系数、力常数、红外、拉曼光谱的计算，并提供友好的数据可视化和导出功能。

### 🎯 核心特点

- **🚀 零安装**：纯前端应用，浏览器即开即用，无需安装任何软件
- **📦 批量处理**：支持创建多个计算工程，一键批量计算同位素分馏
- **📊 数据可视化**：内置图表展示，支持导出高质量图片和 Excel 数据
- **💾 本地存储**：基于 IndexDB 的本地数据持久化，数据安全可控
- **🎨 现代化 UI**：采用 Ant Design 5.0，支持浅色/深色主题自动切换
- **📱 响应式设计**：完美适配桌面端和移动端，多端统一体验
- **⚡️ 高性能**：基于 Vite + React 18 构建，启动快、热更新快

---

## 🛠 技术栈

### 前端框架
- **React 18.2** - 现代化的 UI 框架
- **TypeScript 5.2** - 类型安全的 JavaScript 超集
- **Vite 5.2** - 新一代前端构建工具
- **React Router 6** - 路由管理

### UI 组件库
- **Ant Design 5.17** - 企业级 UI 设计语言
- **Ant Design Charts 2.1** - 开箱即用的数据可视化图表库
- **Ant Design Icons 5.3** - 图标库

### 状态管理
- **Recoil 0.7** - 轻量级状态管理
- **ahooks 3.7** - React Hooks 工具库

### 数据处理
- **Decimal.js 10.4** - 高精度数值计算
- **simple-statistics 7.8** - 统计计算库
- **Lodash 4.17** - 实用工具库
- **Moment.js 2.30** - 日期时间处理

### 数据存储
- **Dexie 4.0** - IndexDB 封装库，提供本地数据持久化

### 其他工具
- **XLSX 0.18** - Excel 文件读写
- **UUID 10.0** - 唯一标识符生成

---

## 🎯 功能特性

### ✅ 当前已支持

#### 计算功能
- ✅ **同位素分馏计算**：基于振动频率信息，计算同位素分馏系数（β 因子、1000lnβ）
- ✅ **力常数计算**：从频率数据计算分子/晶体的力常数矩阵
- ✅ **声子计算**：支持晶体材料的声子模式分析
- ✅ **红外光谱**：计算 IR 光谱数据（CASTEP 格式）
- ✅ **拉曼光谱**：计算 Raman 光谱数据（CASTEP 格式）

#### 软件格式支持
- ✅ **CASTEP**：完整支持 .castep 输出文件解析
- ✅ **GAUSSIAN**：支持 Gaussian 输出文件（部分功能）

#### 数据管理
- ✅ **工程化管理**：创建、编辑、删除计算工程
- ✅ **数据可视化**：交互式图表展示计算结果
- ✅ **数据导出**：
  - 导出高清 PNG/SVG 图片
  - 导出 Excel 数据表
  - 批量导出多个工程数据
- ✅ **本地持久化**：计算数据保存在浏览器 IndexDB 中，刷新不丢失

#### 用户体验
- ✅ **主题切换**：自动跟随系统浅色/深色模式
- ✅ **响应式布局**：PC 端和移动端自适应
- ✅ **浏览器兼容性检测**：自动提示不兼容浏览器


---

## 📦 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm/yarn/pnpm

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/Junlin-Robin/Isotope-Lab.git
cd Isotope-Lab

# 安装依赖
npm install
```

### 开发模式

```bash
# 启动开发服务器（默认端口 5173）
npm run dev
```

浏览器访问：`http://localhost:5173`

### 生产构建

```bash
# 构建生产环境代码
npm run build

# 预览生产构建
npm run preview
```

### 代码检查

```bash
# 运行 ESLint 检查
npm run lint
```

---

## 📁 项目结构

```
quick-man/
├── .github/workflows/       # GitHub Actions CI/CD 配置
│   ├── deploy-development.yaml   # 开发环境部署
│   └── deploy-production.yaml    # 生产环境部署
├── .versions/              # 版本更新日志
│   ├── v0.0.1/
│   ├── v0.0.2/
│   └── v0.0.3/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 图片、字体等资源文件
│   ├── constants/         # 全局常量定义
│   ├── hooks/             # 自定义 React Hooks
│   ├── layout/            # 布局组件
│   │   ├── footer/       # 页脚
│   │   ├── navigator/    # 导航栏（头部 + 侧边栏）
│   │   └── style/        # 布局样式
│   ├── packages/          # 核心计算包
│   │   └── castep/       # CASTEP 格式解析和计算
│   │       ├── calculation/      # 计算模块
│   │       │   ├── force-constant/      # 力常数计算
│   │       │   ├── ir/                  # 红外光谱计算
│   │       │   ├── isotope-fractionation/  # 同位素分馏计算
│   │       │   └── raman/               # 拉曼光谱计算
│   │       └── formatter/        # 文件解析器
│   ├── pages/             # 页面组件
│   │   ├── components/   # 页面通用组件
│   │   └── subpages/     # 子页面
│   │       └── isotope-fractionation/  # 同位素分馏页面
│   │           ├── frequency-calculation/   # 频率计算
│   │           │   ├── models/             # 数据模型
│   │           │   ├── utils/              # 工具函数
│   │           │   └── views/              # 视图组件
│   │           │       ├── overview/       # 工程列表页
│   │           │       └── details/        # 工程详情页
│   │           └── force-matrix-calculation/  # 力矩阵计算
│   ├── routers/           # 路由配置
│   ├── utils/             # 全局工具函数
│   ├── App.tsx            # 应用根组件
│   ├── main.tsx           # 应用入口
│   └── index.less         # 全局样式
├── .env.development       # 开发环境变量
├── .env.production        # 生产环境变量
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
└── package.json           # 项目依赖配置
```

### 核心模块说明

#### 1. 计算引擎 (`src/packages/castep/`)

- **formatter**: 解析 CASTEP/GAUSSIAN 输出文件，提取晶格信息、频率数据
- **calculation**: 核心计算逻辑
  - `isotope-fractionation`: 同位素分馏系数计算（β 因子、1000lnβ）
  - `force-constant`: 力常数矩阵计算
  - `ir`: 红外光谱强度计算
  - `raman`: 拉曼光谱强度计算

#### 2. 页面模块 (`src/pages/`)

- **overview**: 工程管理页面，创建/编辑/删除工程
- **details**: 工程详情页面，上传文件、执行计算、查看结果

#### 3. 数据流

```
用户上传文件 
  → 文件解析 (formatter) 
  → 提取频率数据 
  → 执行计算 (calculation) 
  → 存储到 IndexDB (Dexie) 
  → 数据可视化 (Ant Design Charts) 
  → 导出结果 (XLSX)
```

---

## 🔮 后续规划

### 即将推出的功能

- 🧚 **VASP 支持**：补充 VASP 软件输出文件的解析和计算
- 🧚 **3D 可视化**：基于 WebGL 实现矿物晶体结构的三维预览和交互
- 🧚 **后端服务**：基于 Node.js + Nest.js 开发后端 API，实现云端数据同步
- 🧚 **移动端 App**：开发 iOS/Android 原生应用

### 长期愿景

- 🧚 **分子动力学集成**：接入 MM 计算服务，支持 QM/MM、Onion-model 计算
- 🧚 **超算对接**：连接 Linux 超算集群，支持在线配置和提交计算任务
- 🧚 **用户系统**：实现 SSO 单点登录、多端数据同步、权限管理
- 🧚 **协作功能**：在线文档编辑、团队共享、即时通讯
- 🧚 **消息通知**：微信公众号推送、邮件提醒等

---

## 👥 贡献者

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Junlin-Robin">
        <img src="https://github.com/Junlin-Robin.png" width="80px;" alt="Junlin"/>
        <br />
        <sub><b>王俊霖</b></sub>
      </a>
      <br />
      <sub>项目负责人、主要开发者</sub>
    </td>
    <td align="center">
      <!-- <img src="https://github.com/haizhenwei.png" width="80px;" alt="Haizhen"/>
        <br />
      <sub><b>Haizhen Wei</b></sub>
      <br />
      <sub>算法顾问</sub>
      <br />
      <sub>haizhenwei@nju.edu.cn</sub> -->
      <a href="mailto:haizhenwei@nju.edu.cn">
        <img src="http://www.cmss.org.cn/extinclude/uploads/dist/0/1539853179-8627.jpg" height="80px;" alt="Haizhen Wei"/>
        <br />
        <sub><b>魏海珍</b></sub>
      </a>
      <br />
      <sub>算法、技术顾问</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Geistesblitz7">
        <img src="https://github.com/Geistesblitz7.png" width="80px;" alt="Zhuofan Zhao"/>
        <br />
        <sub><b>赵卓凡</b></sub>
      </a>
      <br />
      <sub>核心贡献者</sub>
    </td>
  </tr>
</table>

### 如何贡献

我们欢迎所有形式的贡献，包括但不限于：

- 🐛 提交 Bug 报告
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码补丁

请阅读 [贡献指南](CONTRIBUTING.md)（待完善）了解更多详情。

---

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

---

## 📮 联系我们

- **作者**：魏海珍
- **邮箱**：haizhenwei@nju.edu.cn
- **项目主页**：[https://github.com/Junlin-Robin/Isotope-Lab](https://github.com/Junlin-Robin/Isotope-Lab)
- **在线演示**：[https://junlin-robin.github.io/Isotope-Lab](https://junlin-robin.github.io/Isotope-Lab/)

---

## 🙏 致谢

感谢以下开源项目：

- [React](https://reactjs.org/) - 用户界面构建库
- [Ant Design](https://ant.design/) - 企业级 UI 设计语言
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集

---

<div align="center">

**如果这个项目对你有帮助，请给我们一个 ⭐️ Star！**

Made with ❤️ by Isotope Lab Team

南京大学地球科学与工程学院 魏海珍 课题组

</div>