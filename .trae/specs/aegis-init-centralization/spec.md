# 第三方监控脚本集中化 Spec

## Why
目前每个 HTML 页面都重复包含 Aegis、Google Analytics (gtag) 和 Clarity 三个第三方监控脚本，导致：
- 代码冗余，维护成本高
- 修改时需要逐一更新所有页面
- 不符合 DRY 原则

## What Changes
- 新建 `api/aegis-init.js` 文件，集中存放所有第三方监控脚本
- 将所有 HTML 页面中的重复脚本替换为对 `api/aegis-init.js` 的引用
- 保持原有脚本的加载顺序和配置参数不变

## Impact
- Affected specs：站点统计与监控能力
- Affected code：
  - 新建：`api/aegis-init.js`
  - 修改：所有 HTML 页面（约 50 个）

## ADDED Requirements
### Requirement: 第三方监控脚本集中化
系统 SHALL 将 Aegis SDK、Google Analytics (gtag) 和 Clarity 三个第三方监控脚本集中到一个 JS 文件中。

#### Scenario: 脚本正常加载
- **WHEN** 页面在 `<head>` 中引入 `api/aegis-init.js`
- **THEN** 页面依次加载 aegis.min.js → 初始化 Aegis → 加载 gtag.js → 初始化 clarity

### Requirement: 向后兼容
系统 SHALL 确保集中化后的脚本功能与之前完全一致。

#### Scenario: Aegis 配置保持不变
- **WHEN** Aegis SDK 加载完成
- **THEN** 使用相同的 id、uin、reportApiSpeed、reportAssetSpeed、spa、hostUrl 配置初始化

## MODIFIED Requirements
### Requirement: HTML 页面脚本引用
所有 HTML 页面的 `<head>` 中原本分散的三个脚本段落，替换为单一的 `<script src="/api/aegis-init.js"></script>` 引用。

## REMOVED Requirements
### Requirement: 内联监控脚本
**Reason**: 脚本已迁移至独立 JS 文件集中管理
**Migration**: 通过外部引用方式加载
